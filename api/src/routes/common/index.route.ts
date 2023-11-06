import { commonCategoryRouter } from './common-category.route';
import { commonProductRouter } from './common-product.route';
import { commonUserRouter } from './common-user.route';
import { commonAuthRouter } from './common-auth.route';
import { purchaseRouter } from './purchase.route';

export const commonRoutes = {
  prefix: '/',
  routes: [
    {
      path: '',
      route: commonAuthRouter,
    },
    {
      path: 'user',
      route: commonUserRouter,
    },
    {
      path: 'categories',
      route: commonCategoryRouter,
    },
    {
      path: 'products',
      route: commonProductRouter,
    },
    {
      path: 'purchases',
      route: purchaseRouter,
    },
  ],
};
