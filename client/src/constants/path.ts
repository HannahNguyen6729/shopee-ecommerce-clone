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

//export const API_URL = 'https://api-shopee.onrender.com/' || 'https://api-ecom.duthanhduoc.com/';

export const API_URL = 'https://api-ecom.duthanhduoc.com/';
