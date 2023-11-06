import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { userController } from '../../controller/user.controller';
import { helpersMiddleware } from '../../middlewares/helper.middleware';
import { userMiddleware } from '../../middlewares/user.middleware';

export const adminUserRouter = express.Router();

adminUserRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  userController.getUsers,
);

adminUserRouter.get(
  '/:user_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('user_id'),
  helpersMiddleware.idValidator,
  userController.getUser,
);

adminUserRouter.delete(
  '/delete/:user_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('user_id'),
  helpersMiddleware.idValidator,
  userController.deleteUser,
);

adminUserRouter.post(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  userMiddleware.addUserRules(),
  helpersMiddleware.entityValidator,
  userController.addUser,
);

adminUserRouter.put(
  '/:user_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('user_id'),
  helpersMiddleware.idValidator,
  userMiddleware.updateUserRules(),
  helpersMiddleware.entityValidator,
  userController.updateUser,
);
