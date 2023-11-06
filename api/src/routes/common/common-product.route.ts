import express from 'express';
import { productController } from '../../controller/product.controller';
import { helpersMiddleware } from '../../middlewares/helper.middleware';
import { productMiddleware } from '../../middlewares/product.middleware';

/**
 * [Get products paginate]
 * @queryParam type: string, page: number, limit: number, category:mongoId, exclude: mongoId product
 * @route products
 * @method get
 */

export const commonProductRouter = express.Router();

commonProductRouter.get(
  '/',
  productMiddleware.getProductsRules(),
  helpersMiddleware.entityValidator,
  productController.getProducts,
);

commonProductRouter.get(
  '/:product_id',
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  productController.getProduct,
);
