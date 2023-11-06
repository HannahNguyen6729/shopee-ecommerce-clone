import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { categoryMiddleware } from '../../middlewares/category.middleware';
import { helpersMiddleware } from '../../middlewares/helper.middleware';
import { categoryController } from '../../controller/category.controller';

export const adminCategoryRouter = express.Router();

adminCategoryRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  categoryMiddleware.getCategoryRules(),
  helpersMiddleware.entityValidator,
  categoryController.getCategories,
);
adminCategoryRouter.get(
  '/:category_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  categoryController.getCategory,
);
adminCategoryRouter.post(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  categoryMiddleware.addCategoryRules(),
  helpersMiddleware.entityValidator,
  categoryController.addCategory,
);
adminCategoryRouter.put(
  '/:category_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  categoryMiddleware.updateCategoryRules(),
  helpersMiddleware.entityValidator,
  categoryController.updateCategory,
);
adminCategoryRouter.delete(
  '/delete/:category_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  categoryController.deleteCategory,
);
