import express from 'express';
import { userController } from '../../controller/user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { userMiddleware } from '../../middlewares/user.middleware';
import { helpersMiddleware } from '../../middlewares/helper.middleware';

export const commonUserRouter = express.Router();

commonUserRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  userController.getDetailMyself,
);

commonUserRouter.put(
  '',
  authMiddleware.verifyAccessToken,
  userMiddleware.updateMeRules(),
  helpersMiddleware.entityValidator,
  userController.updateMe,
);
