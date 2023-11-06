import dotenv from 'dotenv';
dotenv.config();

export const config = {
  SECRET_KEY: process.env.ACCESS_TOKEN_SECRET || '',
  EXPIRE_ACCESS_TOKEN: 60 * 60 * 24 * 2,
  EXPIRE_REFRESH_TOKEN: 60 * 60 * 24 * 100,
};

export const FOLDER_UPLOAD = 'upload';

export const FOLDERS = {
  PRODUCT: 'product',
  AVATAR: 'avatar',
};

export const ROUTE_IMAGE = 'images';
