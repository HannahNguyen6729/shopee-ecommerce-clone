import express from 'express';
import { purchaseController } from '../../controller/purchase.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { purchaseMiddleware } from '../../middlewares/purchase.middleware';
import { helpersMiddleware } from '../../middlewares/helper.middleware';

export const purchaseRouter = express.Router();

purchaseRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  purchaseController.getPurchases,
);

purchaseRouter.post(
  '/add-to-cart',
  purchaseMiddleware.addToCartRules(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  purchaseController.addToCart,
);

purchaseRouter.delete(
  '',
  purchaseMiddleware.deletePurchasesRules(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  purchaseController.deletePurchases,
);

purchaseRouter.post(
  '/buy-products',
  purchaseMiddleware.buyProductsRules(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  purchaseController.buyProducts,
);

purchaseRouter.put(
  '/update-purchase',
  purchaseMiddleware.updatePurchaseRules(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  purchaseController.updatePurchase,
);
