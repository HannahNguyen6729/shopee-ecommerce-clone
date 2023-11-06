import { Response, Request } from 'express';
import { STATUS } from '../constants/status';
import { SuccessResponse } from '../types/response.type';
import { UserModel } from '../models/user.model';
import { compareHashPassword, hashPasswordValue } from '../utils/helper';
import { Login, PayloadToken, Register } from '../types/auth.type';
import { omit } from 'lodash';
import { config } from '../constants/config';
import { ROLE } from '../constants/role';
import { AccessTokenModel } from '../models/access_token.model';
import { RefreshTokenModel } from '../models/refresh_token.model';
import { User } from '../types/user.type';
import jwt from 'jsonwebtoken';

interface RequestCustom extends Request {
  jwtDecoded: any;
}

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as Register;

    //check for existing user
    const userInDB = await UserModel.findOne({ email });
    console.log({ userInDB });
    if (!userInDB) {
      const hashedPassword = hashPasswordValue(password);
      const newUser = new UserModel({
        email,
        password: hashedPassword,
      });
      await newUser.save();

      //create access_token & return
      const payloadJWT: PayloadToken = {
        email,
        userId: newUser._id.toString(),
        roles: [ROLE.USER],
        created_at: new Date().toISOString(),
      };

      const access_token = jwt.sign(payloadJWT, config.SECRET_KEY, {
        expiresIn: config.EXPIRE_ACCESS_TOKEN,
      });

      const refresh_token = jwt.sign(payloadJWT, config.SECRET_KEY, {
        expiresIn: config.EXPIRE_REFRESH_TOKEN,
      });

      await new AccessTokenModel({
        user_id: newUser._id,
        token: access_token,
      }).save();
      await new RefreshTokenModel({
        user_id: newUser._id,
        token: access_token,
      }).save();

      const response: SuccessResponse = {
        message: 'user created successfully',
        data: {
          user: omit(newUser, ['password']),
          access_token: 'Bearer ' + access_token,
          refresh_token,
          expires: config.EXPIRE_ACCESS_TOKEN,
          expires_refresh_token: config.EXPIRE_REFRESH_TOKEN,
        },
      };
      return res.status(STATUS.OK).send(response);
    }
    return res
      .status(STATUS.UNPROCESSABLE_ENTITY)
      .send({ message: 'email already existed' });
  } catch (err) {
    return res.status(STATUS.BAD_REQUEST).send(err);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as Login;
    //check if email already existed
    const userInDB: User | null = await UserModel.findOne({ email }).lean();
    if (!userInDB) {
      return res
        .status(STATUS.UNPROCESSABLE_ENTITY)
        .send({ message: 'incorrect email' });
    }

    //check if password matches
    const isPasswordValid = compareHashPassword(password, userInDB.password);
    if (!isPasswordValid) {
      return res
        .status(STATUS.UNPROCESSABLE_ENTITY)
        .send({ message: 'incorrect password' });
    }

    //create access_token & return
    const payloadJWT: PayloadToken = {
      email,
      userId: userInDB._id.toString(),
      roles: userInDB.roles,
      created_at: new Date().toISOString(),
    };

    const access_token = jwt.sign(payloadJWT, config.SECRET_KEY, {
      expiresIn: config.EXPIRE_ACCESS_TOKEN,
    });

    const refresh_token = jwt.sign(payloadJWT, config.SECRET_KEY, {
      expiresIn: config.EXPIRE_REFRESH_TOKEN,
    });

    await new AccessTokenModel({
      user_id: userInDB._id,
      token: access_token,
    }).save();
    await new RefreshTokenModel({
      user_id: userInDB._id,
      token: access_token,
    }).save();

    const response: SuccessResponse = {
      message: 'login successfully',
      data: {
        user: omit(userInDB, ['password']),
        access_token: 'Bearer ' + access_token,
        refresh_token,
        expires: config.EXPIRE_ACCESS_TOKEN,
        expires_refresh_token: config.EXPIRE_REFRESH_TOKEN,
      },
    };
    return res.status(STATUS.OK).send(response);
  } catch (err) {
    return res.status(STATUS.BAD_REQUEST).send(err);
  }
};

const logoutController = async (req: Request, res: Response) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  await AccessTokenModel.findOneAndDelete({
    token: access_token,
  });
  return res.status(STATUS.OK).send({ message: 'logout successfully' });
};

const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const userInDB: any = await UserModel.findById(req.jwtDecoded.id).lean();

    if (!userInDB)
      return res
        .status(STATUS.UNAUTHORIZED)
        .send({ message: 'refresh token does not exist' });

    const payloadJWT: PayloadToken = {
      userId: userInDB._id.toString(),
      email: userInDB.email,
      roles: userInDB.roles,
      created_at: new Date().toISOString(),
    };

    const access_token = jwt.sign(payloadJWT, config.SECRET_KEY, {
      expiresIn: config.EXPIRE_ACCESS_TOKEN,
    });

    await new AccessTokenModel({
      user_id: req.jwtDecoded.id,
      token: access_token,
    }).save();

    const response = {
      message: 'refresh access token successfully',
      data: {
        access_token: 'Bearer ' + access_token,
      },
    };

    return res.status(STATUS.OK).send(response);
  } catch (err) {
    return res.status(STATUS.BAD_REQUEST).send({ message: err });
  }
};

export const authController = {
  loginController,
  logoutController,
  registerController,
  refreshTokenController,
};
