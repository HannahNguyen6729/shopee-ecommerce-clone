import { Request, Response } from 'express';
import { STATUS } from '../constants/status';
import { SuccessResponse } from '../types/response.type';
import { PurchaseModel } from '../models/purchase.model';
import { STATUS_PURCHASE } from '../constants/purchase';
import { ProductModel } from '../models/product.model';
import { Product } from '../types/product';
import { Purchase } from '../types/purchase';
import { handleImageProduct } from '../utils/helper';
import { cloneDeep } from 'lodash';

const getPurchases = async (req: Request, res: Response) => {
  try {
    const status = req.query.status ? req.query.status : STATUS_PURCHASE.ALL;

    const condition: any = {
      user: req.jwtDecoded.userId,
      status: { $ne: STATUS_PURCHASE.IN_CART },
    };

    if (Number(status) !== STATUS_PURCHASE.ALL) {
      condition.status = status;
    }

    let purchases = await PurchaseModel.find(condition)
      .populate({ path: 'product', populate: { path: 'category' } })
      .sort({ createdAt: -1 })
      .lean();

    purchases = purchases.map((purchase) => {
      purchase.product = handleImageProduct(cloneDeep(purchase.product));
      return purchase;
    });
    const response: SuccessResponse = {
      message: 'get purchases successfully',
      data: purchases,
    };
    return res.status(STATUS.OK).send(response);
  } catch (err) {
    return res.status(STATUS.BAD_REQUEST).send(err);
  }
};

const addToCart = async (req: Request, res: Response) => {
  try {
    const { product_id, buy_count } = req.body;

    const product = await ProductModel.findById(product_id).lean();
    if (!product)
      return res
        .status(STATUS.NOT_FOUND)
        .send({ message: 'Product not found' });

    if (buy_count > product.quantity)
      return res.status(STATUS.NOT_ACCEPTABLE).send({
        message:
          'The requested quantity of products exceeds the available quantity',
      });

    const purchaseInDB = await PurchaseModel.findOne({
      user: req.jwtDecoded.userId,
      product: product._id,
      status: STATUS_PURCHASE.IN_CART,
    })
      .populate({
        path: 'product',
        populate: {
          path: 'category',
        },
      })
      .lean();

    let purchaseData;
    if (!purchaseInDB) {
      //create a new purchase bill
      const newPurchase = {
        user: req.jwtDecoded.userId,
        product: product._id,
        buy_count,
        price: product.price,
        price_before_discount: product.price_before_discount,
        status: STATUS_PURCHASE.IN_CART,
      };

      const addedPurchase = await new PurchaseModel(newPurchase).save();
      purchaseData = await PurchaseModel.findById(addedPurchase._id)
        .populate({ path: 'product', populate: { path: 'category' } })
        .lean();
    } else {
      //update the purchase bill
      purchaseData = await PurchaseModel.findOneAndUpdate(
        {
          user: req.jwtDecoded.userId,
          status: STATUS_PURCHASE.IN_CART,
          product: product._id,
        },
        { buy_count: purchaseInDB.buy_count + buy_count },
        { new: true },
      )
        .populate({ path: 'product', populate: { path: 'category' } })
        .lean();
    }

    const response: SuccessResponse = {
      message: 'add product to cart successfully',
      data: purchaseData,
    };
    return res.status(STATUS.OK).send(response);
  } catch (err) {
    return res.status(STATUS.BAD_REQUEST).send(err);
  }
};

const deletePurchases = async (req: Request, res: Response) => {
  try {
    const purchaseIds: string[] = req.body;

    const userId = req.jwtDecoded.userId;
    const deletedData = await PurchaseModel.deleteMany({
      user: userId,
      status: STATUS_PURCHASE.IN_CART,
      _id: { $in: purchaseIds },
    });

    return res.status(STATUS.OK).send({
      message: `Delete ${deletedData.deletedCount} bill successfully`,
      data: { deleted_count: deletedData.deletedCount, deletedData },
    });
  } catch (err) {
    return res.status(STATUS.BAD_REQUEST).send(err);
  }
};

const buyProducts = async (req: Request, res: Response) => {
  const purchases: Purchase[] = [];

  for (const item of req.body) {
    const product: Product | null = await ProductModel.findById(
      item.product_id,
    ).lean();

    if (!product) {
      return res
        .status(STATUS.NOT_FOUND)
        .send({ message: 'product not found' });
    } else {
      if (item.buy_count > product.quantity)
        return res.status(STATUS.NOT_ACCEPTABLE).send({
          message:
            'The requested product quantity exceeds the available quantity',
        });

      let data: Purchase | null = await PurchaseModel.findOneAndUpdate(
        {
          user: req.jwtDecoded.userId,
          status: STATUS_PURCHASE.IN_CART,
          product: item.product_id,
        },
        {
          buy_count: item.buy_count,
          status: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION,
        },
        { new: true },
      )
        .populate({
          path: 'product',
          populate: {
            path: 'category',
          },
        })
        .lean();

      if (!data) {
        const newPurchase = {
          user: req.jwtDecoded.userId,
          product: item.product_id,
          buy_count: item.buy_count,
          price: product.price,
          price_before_discount: product.price_before_discount,
          status: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION,
        };
        const addedPurchase = await new PurchaseModel(newPurchase).save();
        data = await PurchaseModel.findById(addedPurchase._id).populate({
          path: 'product',
          populate: { path: 'category' },
        });
        purchases.push(data as Purchase);
      }
    }
  }

  const response: SuccessResponse = {
    message: 'buy products successfully',
    data: purchases,
  };
  return res.status(STATUS.OK).send(response);
};

const updatePurchase = async (req: Request, res: Response) => {
  try {
    const { product_id, buy_count } = req.body;

    const purchaseInDB: any = await PurchaseModel.findOne({
      product: product_id,
      user: req.jwtDecoded.userId,
      status: STATUS_PURCHASE.IN_CART,
    })
      .populate({ path: 'product', populate: { path: 'category' } })
      .lean();

    if (purchaseInDB) {
      if (buy_count > purchaseInDB.product.quantity)
        return res.status(STATUS.NOT_ACCEPTABLE).send({
          message: 'The requested quantity exceeds the available quantity',
        });

      const updatedPurchase = await PurchaseModel.findOneAndUpdate(
        {
          user: req.jwtDecoded.userId,
          product: product_id,
          status: STATUS_PURCHASE.IN_CART,
        },
        {
          buy_count,
        },
        { new: true },
      )
        .populate({ path: 'product', populate: { path: 'category' } })
        .lean();

      const response: SuccessResponse = {
        message: 'update purchase successfully',
        data: updatedPurchase,
      };
      return res.status(STATUS.OK).send(response);
    } else {
      return res
        .status(STATUS.NOT_FOUND)
        .send({ message: 'purchase not found' });
    }
  } catch (err) {
    return res.status(STATUS.BAD_REQUEST).send(err);
  }
};

export const purchaseController = {
  getPurchases,
  addToCart,
  deletePurchases,
  buyProducts,
  updatePurchase,
};
