import express from 'express';
import { categoryController } from '../../controller/category.controller';
import { helpersMiddleware } from '../../middlewares/helper.middleware';
import { categoryMiddleware } from '../../middlewares/category.middleware';

export const commonCategoryRouter = express.Router();

commonCategoryRouter.get(
  '/',
  categoryMiddleware.getCategoryRules(),
  helpersMiddleware.entityValidator,
  categoryController.getCategories,
);

commonCategoryRouter.get(
  '/:category_id',
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  categoryController.getCategory,
);
