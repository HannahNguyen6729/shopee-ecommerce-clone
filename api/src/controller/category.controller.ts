import { Request, Response } from 'express';
import { CategoryModel } from '../models/category.model';
import { STATUS } from '../constants/status';
import { SuccessResponse } from '../types/response.type';

const getCategories = async (req: Request, res: Response) => {
  try {
    const { exclude } = req.query;
    const condition = exclude ? { _id: { $ne: exclude } } : {};

    const categories = await CategoryModel.find(condition)
      .select({ __v: 0 })
      .lean();

    const data: SuccessResponse = {
      message: 'Get categories successfully!',
      data: categories,
    };

    return res.status(STATUS.OK).send(data);
  } catch (error) {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: 'An error occurred', error });
  }
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.findById(req.params.category_id)
      .select({ __v: 0 })
      .lean();
    if (category) {
      const data: SuccessResponse = {
        message: 'Get category successfully!',
        data: category,
      };
      return res.status(STATUS.OK).send(data);
    }
  } catch (error) {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: 'An error occurred', error });
  }
};

const addCategory = async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const categoryAdd = await new CategoryModel({ name }).save();

  const response: SuccessResponse = {
    message: ' Category successfully added',
    data: categoryAdd.toObject({
      transform: (doc, ret, option) => {
        delete ret.__v;
        return ret;
      },
    }),
  };
  return res.status(STATUS.OK).send(response);
};

const updateCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const categoryDB = await CategoryModel.findByIdAndUpdate(
    req.params.category_id,
    { name },
    { new: true },
  )
    .select({ __v: 0 })
    .lean();
  if (categoryDB) {
    const response = {
      message: ' category successfully updated',
      data: categoryDB,
    };
    return res.status(STATUS.OK).send(response);
  } else {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: 'category not found' });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const category_id = req.params.category_id;
  const categoryDB = await CategoryModel.findByIdAndDelete(category_id).lean();
  if (categoryDB) {
    return res
      .status(STATUS.OK)
      .send({ message: 'delete category successfully' });
  } else {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: 'category not found' });
  }
};

export const categoryController = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
