export const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const;

export const purchaseUrl = 'purchases';

export const API_URL = process.env.REACT_APP_API_URL || 'https://api-ecom.duthanhduoc.com/';
