import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { productMiddleware } from '../../middlewares/product.middleware';
import { helpersMiddleware } from '../../middlewares/helper.middleware';
import { productController } from '../../controller/product.controller';

export const adminProductRouter = express.Router();

/**
 * [Get products paginate]
 * @queryParam type: string, page: number, limit: number, category:mongoId
 * @route admin/products
 * @method get
 */
adminProductRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  productMiddleware.getProductsRules(),
  helpersMiddleware.entityValidator,
  productController.getProducts,
);
/**
 * [Get all products ]
 * @queryParam type: string, category:mongoId
 * @route admin/products/all
 * @method get
 */
adminProductRouter.get(
  '/all',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  productMiddleware.getProductsRules(),
  helpersMiddleware.entityValidator,
  productController.getAllProducts,
);

adminProductRouter.get(
  '/:product_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  productController.getProduct,
);

adminProductRouter.delete(
  '/delete/:product_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  productController.deleteProduct,
);

adminProductRouter.delete(
  '/delete-many',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.listIdRule('list_id'),
  helpersMiddleware.idValidator,
  productController.deleteManyProducts,
);

adminProductRouter.post(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  productMiddleware.addProductRules(),
  helpersMiddleware.entityValidator,
  productController.addProduct,
);

adminProductRouter.put(
  '/:product_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  productMiddleware.updateProductRules(),
  helpersMiddleware.entityValidator,
  productController.updateProduct,
);

adminProductRouter.post(
  '/upload-image',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  productController.uploadProductImage,
);

adminProductRouter.post(
  '/upload-images',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  productController.uploadManyProductImages,
);
