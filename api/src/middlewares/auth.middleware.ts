import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../constants/status';
import { config } from '../constants/config';
import { PayloadToken } from '../types/auth.type';
import { AccessTokenModel } from '../models/access_token.model';
import { body } from 'express-validator';
import { RefreshTokenModel } from '../models/refresh_token.model';
import { UserModel } from '../models/user.model';
import { ROLE } from '../constants/role';
import { nextTick } from 'process';

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const access_token = req.headers.authorization?.split(' ')[1];
  if (!access_token) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send({ message: 'access token not found' });
  }

  try {
    const decodedToken = jwt.verify(
      access_token,
      config.SECRET_KEY,
    ) as PayloadToken;

    const accessTokenDB = await AccessTokenModel.findOne({
      token: access_token,
    });

    if (!accessTokenDB)
      return res
        .status(STATUS.UNAUTHORIZED)
        .send({ message: 'access token not found' });

    req.jwtDecoded = decodedToken;
    next();
  } catch (error) {
    res.status(STATUS.UNAUTHORIZED).send({ message: error });
  }
};

const registerRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Not a valid email address')
      .isLength({ min: 5, max: 160 })
      .withMessage(
        'email must contain at least 5 characters & at most 160 characters',
      ),
    body('password')
      .exists({ checkFalsy: true })
      .withMessage('password must be not empty')
      .isLength({ min: 8, max: 160 })
      .withMessage(
        'password must contain at least 8 characters & at most 160 characters',
      ),
  ];
};

const loginRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Not a valid email address')
      .isLength({ min: 5, max: 160 })
      .withMessage(
        'email must contain at least 5 characters & at most 160 characters',
      ),
    body('password')
      .isLength({ min: 8, max: 160 })
      .withMessage(
        'password must contain at least 8 characters & at most 160 characters',
      ),
  ];
};

const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refresh_token = req.body.refresh_token;
  if (!refresh_token) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send({ message: 'refresh access token not found' });
  }

  try {
    const decoded = jwt.verify(
      refresh_token,
      config.SECRET_KEY,
    ) as PayloadToken;

    const refreshTokenDB = await RefreshTokenModel.findOne({
      token: refresh_token,
    });

    if (!refreshTokenDB) {
      return res
        .status(STATUS.UNAUTHORIZED)
        .send({ message: 'token does not exist' });
    } else {
      req.jwtDecoded = decoded;
      return next();
    }
  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).send({ message: error });
  }
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userInDB = await UserModel.findById(req.jwtDecoded.userId).lean();
  if (userInDB?.roles.includes(ROLE.ADMIN)) {
    console.log({ userInDB });
    return next();
  } else {
    return res
      .status(STATUS.FORBIDDEN)
      .send({ message: 'you do not have permission to access the data' });
  }
};

export const authMiddleware = {
  verifyAccessToken,
  loginRules,
  registerRules,
  verifyRefreshToken,
  verifyAdmin,
};
