import { Request, Response } from 'express';
import { STATUS } from '../constants/status';
import { UserModel } from '../models/user.model';
import { SuccessResponse } from '../types/response.type';
import { User } from '../types/user.type';
import { omitBy } from 'lodash';
import { hashPasswordValue } from '../utils/helper';

const getDetailMyself = async (req: Request, res: Response) => {
  try {
    const userData = await UserModel.findById(req.jwtDecoded.userId)
      .select({
        password: 0,
        __v: 0,
      })
      .lean();
    console.log({ userData });
    if (!userData)
      return res.status(STATUS.NOT_FOUND).send({ message: 'User not found' });

    const response: SuccessResponse = {
      message: 'get user data successfully',
      data: userData,
    };
    return res.status(STATUS.OK).send(response);
  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).send(error);
  }
};

const updateMe = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      new_password,
      phone,
      address,
      date_of_birth,
      avatar,
    } = req.body as User;

    const updateForm = omitBy(
      {
        name,
        email,
        password,
        phone,
        address,
        date_of_birth,
        avatar,
      },
      (value) => value === undefined || value === '',
    );

    const userInDB = await UserModel.findById(req.jwtDecoded.userId).lean();
    if (updateForm.password) {
      const hash_password = hashPasswordValue(password);
      console.log(userInDB?.password === hash_password);
      if (userInDB && userInDB.password === hash_password) {
        Object.assign(updateForm, {
          password: hashPasswordValue(new_password),
        });
        // updateForm.password = hashPasswordValue(new_password);
      } else {
        return res
          .status(STATUS.UNPROCESSABLE_ENTITY)
          .send({ message: 'incorrect password' });
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.jwtDecoded.userId,
      updateForm,
      { new: true },
    )
      .select({ password: 0, __v: 0 })
      .lean();

    const response: SuccessResponse = {
      message: 'update user data successfully',
      data: updatedUser,
    };
    return res.status(STATUS.OK).send(response);
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({})
      .select({ password: 0, __v: 0 })
      .lean();
    if (!users)
      return res
        .status(STATUS.UNAUTHORIZED)
        .send({ message: 'users not found' });

    const response: SuccessResponse = {
      message: 'get all users successfully',
      data: users,
    };
    return res.status(STATUS.OK).send(response);
  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).send(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.user_id)
      .select({ password: 0, __v: 0 })
      .lean();

    if (!user)
      return res.status(STATUS.BAD_REQUEST).send({ message: 'user not found' });

    const response: SuccessResponse = {
      message: 'get user data successfully',
      data: user,
    };

    return res.status(STATUS.OK).send(response);
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.user_id)
      .select({ password: 0, __v: 0 })
      .lean();

    if (!deletedUser)
      return res.status(STATUS.BAD_REQUEST).send({ message: 'user not found' });
    const response: SuccessResponse = {
      message: 'delete user successfully',
      data: deletedUser,
    };

    return res.status(STATUS.OK).send(response);
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).send(error);
  }
};

const addUser = async (req: Request, res: Response) => {
  const form: User = req.body;
  const {
    email,
    password,
    address,
    date_of_birth,
    name,
    phone,
    roles,
    avatar,
  } = form;

  const userInDB = await UserModel.findOne({ email: email });

  if (!userInDB) {
    const hashedPassword = hashPasswordValue(password);
    const user = {
      email,
      password: hashedPassword,
      roles,
      address,
      date_of_birth,
      name,
      phone,
      avatar,
    };

    Object.keys(user).forEach(
      (key) =>
        user[key as keyof typeof user] === undefined &&
        delete user[key as keyof typeof user],
    );

    const userAdd = await new UserModel(user).save();
    const response: SuccessResponse = {
      message: 'created new user successfully',
      data: userAdd.toObject({
        transform: (doc, ret, option) => {
          delete ret.password;
          delete ret.__v;
          return ret;
        },
      }),
    };
    return res.status(STATUS.OK).send(response);
  }
  return res
    .status(STATUS.NOT_ACCEPTABLE)
    .send({ message: 'email already exists' });
};

const updateUser = async (req: Request, res: Response) => {
  const form: User = req.body;
  const { password, address, date_of_birth, name, phone, roles, avatar } = form;
  const user = omitBy(
    {
      password,
      address,
      date_of_birth,
      name,
      phone,
      roles,
      avatar,
    },
    (value) => value === undefined || value === '',
  );

  const userDB = await UserModel.findByIdAndUpdate(req.params.user_id, user, {
    new: true,
  })
    .select({ password: 0, __v: 0 })
    .lean();
  if (userDB) {
    const response: SuccessResponse = {
      message: 'updated user successfully',
      data: userDB,
    };
    return res.status(STATUS.OK).send(response);
  } else {
    return res.status(STATUS.BAD_REQUEST).send({ message: 'user not found' });
  }
};

export const userController = {
  getDetailMyself,
  updateMe,
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
};
