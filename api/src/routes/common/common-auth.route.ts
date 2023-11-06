import express from 'express';
import { authController } from '../../controller/auth.controller';
import { helpersMiddleware } from '../../middlewares/helper.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const commonAuthRouter = express.Router();

commonAuthRouter.post(
  '/register',
  authMiddleware.registerRules(),
  helpersMiddleware.entityValidator,
  authController.registerController,
);

commonAuthRouter.post(
  '/login',
  authMiddleware.loginRules(),
  helpersMiddleware.entityValidator,
  authController.loginController,
);

commonAuthRouter.post(
  '/logout',
  authMiddleware.verifyAccessToken,
  authController.logoutController,
);

commonAuthRouter.post(
  '/refresh-access-token',
  authMiddleware.verifyRefreshToken,
  authController.refreshTokenController,
);
