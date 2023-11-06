import { Request, Response } from 'express';
import { STATUS } from '../constants/status';
import { ProductModel } from '../models/product.model';
import {
  handleImageProduct,
  removeImageProduct,
  removeManyImageProduct,
  uploadFile,
  uploadManyFile,
} from '../utils/helper';
import { ORDER, SORT_BY } from '../constants/product';
import mongoose from 'mongoose';
import { Product } from '../types/product';
import { omitBy } from 'lodash';
import { FOLDERS } from '../constants/config';
import { SuccessResponse } from '../types/response.type';

interface QueryProps {
  [key: string]: string | number;
}

//get products by query params
const getProducts = async (req: Request, res: Response) => {
  try {
    // console.log('query: ', req.query);
    let {
      page = 1,
      limit = 30,
      category,
      exclude,
      price_max,
      price_min,
      rating_filter,
      name,
      order,
      sort_by,
    } = req.query as QueryProps;

    page = Number(page);
    limit = Number(limit);

    let condition: any = {};
    if (category) condition.category = category;
    if (exclude) condition._id = { $ne: exclude };
    if (rating_filter) condition.rating = { $gte: rating_filter };
    if (price_max) condition.price = { $lte: price_max };
    if (price_min)
      condition.price = condition.price
        ? { ...condition.price, $gte: price_min }
        : { $gte: price_min };
    if (name) condition.name = { $regex: name, $options: 'i' };
    if (!ORDER.includes(order as string)) order = ORDER[0];
    if (!SORT_BY.includes(sort_by as string)) sort_by = SORT_BY[0];
    console.log({ condition, sort_by, order });

    const products = await ProductModel.find(condition)
      .populate({ path: 'category' })
      .sort({ [sort_by as string]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(page * limit - limit)
      .select({ __v: 0 })
      .lean();

    const totalProduct = await ProductModel.find(condition)
      .countDocuments()
      .lean();

    const page_size = Math.ceil(totalProduct / limit) || 1;

    const updatedProducts = products.map((product) =>
      handleImageProduct(product),
    );
    const response: SuccessResponse = {
      message: 'Get all products successfully',
      data: {
        products: updatedProducts,
        pagination: {
          page,
          limit,
          page_size,
        },
      },
    };
    return res.status(STATUS.OK).send(response);
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).send(error);
  }
};

//get products by category
const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const products = await ProductModel.find(category ? { category } : {})
      .select({ __v: 0 })
      .populate('category', ['name'])
      .sort({ createdAt: -1 })
      .lean();

    const updatedProducts = products.map((product) =>
      handleImageProduct(product),
    );
    const response: SuccessResponse = {
      message: 'Get products by category successfully',
      data: updatedProducts,
    };
    return res.status(STATUS.OK).send(response);
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).send(error);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.product_id)
      .select({ __v: 0 })
      .populate('category', ['name'])
      .lean();
    if (product) {
      const response: SuccessResponse = {
        message: 'Get product successfully',
        data: handleImageProduct(product),
      };
      return res.status(STATUS.OK).send(response);
    }
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).send(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  let { category } = req.query;
  let condition = {};
  if (category) {
    condition = { category: category };
  }
  let products: any = await ProductModel.find(condition)
    .populate({ path: 'category' })
    .sort({ createdAt: -1 })
    .select({ __v: 0, description: 0 })
    .lean();
  products = products.map((product: any) => handleImageProduct(product));
  const response = {
    message: 'get all products successfully',
    data: products,
  };
  return res.status(STATUS.OK).send(response);
};

const deleteProduct = async (req: Request, res: Response) => {
  const product_id = req.params.product_id;
  const productDB: any =
    await ProductModel.findByIdAndDelete(product_id).lean();
  if (productDB) {
    removeImageProduct(productDB.image);
    removeManyImageProduct(productDB.images);
    return res.status(STATUS.OK).send({ message: 'delete successfully' });
  } else {
    return res.status(STATUS.NOT_FOUND).send({ message: 'product not found' });
  }
};

const deleteManyProducts = async (req: Request, res: Response) => {
  const list_id = (req.body.list_id as string[]).map(
    (id: string) => new mongoose.Types.ObjectId(id),
  );

  const productDB: any = await ProductModel.find({
    _id: { $in: list_id },
  }).lean();

  const deletedData = await ProductModel.deleteMany({
    _id: { $in: list_id },
  }).lean();

  productDB.forEach((product: any) => {
    removeImageProduct(product.image);
    removeManyImageProduct(product.images);
  });

  if (productDB.length > 0) {
    return res.status(STATUS.OK).send({
      message: ` ${deletedData.deletedCount} products successfully deleted`,
      data: { deleted_count: deletedData.deletedCount },
    });
  } else {
    return res.status(STATUS.NOT_FOUND).send({ message: 'product not found' });
  }
};

const addProduct = async (req: Request, res: Response) => {
  const form: Product = req.body;
  const {
    name,
    description,
    category,
    image,
    images,
    price,
    rating,
    price_before_discount,
    quantity,
    sold,
    view,
  } = form;
  const product = {
    name,
    description,
    category,
    image,
    images,
    price,
    rating,
    price_before_discount,
    quantity,
    sold,
    view,
  };
  const productAdd = await new ProductModel(product).save();

  const response = {
    message: 'add a new product successfully',
    data: productAdd.toObject({
      transform: (doc, ret, option) => {
        delete ret.__v;
        return handleImageProduct(ret);
      },
    }),
  };
  return res.status(STATUS.OK).send(response);
};

const updateProduct = async (req: Request, res: Response) => {
  const form: Product = req.body;

  const {
    name,
    description,
    category,
    image,
    rating,
    price,
    images,
    price_before_discount,
    quantity,
    sold,
    view,
  } = form;

  const product = omitBy(
    {
      name,
      description,
      category,
      image,
      rating,
      price,
      images,
      price_before_discount,
      quantity,
      sold,
      view,
    },
    (value) => value === undefined || value === '',
  );
  const productDB = await ProductModel.findByIdAndUpdate(
    req.params.product_id,
    product,
    {
      new: true,
    },
  )
    .select({ __v: 0 })
    .lean();

  if (productDB) {
    const response = {
      message: 'update product successfully',
      data: handleImageProduct(productDB),
    };

    return res.status(STATUS.OK).send(response);
  } else {
    return res.status(STATUS.NOT_FOUND).send({ message: 'product not found' });
  }
};

const uploadProductImage = async (req: Request, res: Response) => {
  const path = await uploadFile(req, FOLDERS.PRODUCT);
  const response = {
    message: 'Upload image successfully',
    data: path,
  };
  return res.status(STATUS.OK).send(response);
};

const uploadManyProductImages = async (req: Request, res: Response) => {
  const paths = await uploadManyFile(req, FOLDERS.PRODUCT);
  const response = {
    message: 'Upload images successfully',
    data: paths,
  };
  return res.status(STATUS.OK).send(response);
};

export const productController = {
  getProducts,
  getProduct,
  getProductsByCategory,
  getAllProducts,
  deleteProduct,
  deleteManyProducts,
  addProduct,
  updateProduct,
  uploadProductImage,
  uploadManyProductImages,
};
