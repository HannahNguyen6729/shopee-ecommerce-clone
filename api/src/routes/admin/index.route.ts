import { adminAuthRouter } from './admin-auth.route';
import { adminCategoryRouter } from './admin-category.route';
import { adminProductRouter } from './admin-product.route';
import { adminUserRouter } from './admin-user.route';

export const adminRoutes = {
  prefix: '/admin/',
  routes: [
    {
      path: 'users',
      route: adminUserRouter,
    },
    {
      path: 'products',
      route: adminProductRouter,
    },
    {
      path: 'categories',
      route: adminCategoryRouter,
    },
    {
      path: '',
      route: adminAuthRouter,
    },
  ],
};
