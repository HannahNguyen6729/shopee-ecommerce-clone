import crypto from 'crypto';
import { FOLDERS, FOLDER_UPLOAD, ROUTE_IMAGE } from '../constants/config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import { IncomingForm } from 'formidable';
import { isEmpty } from 'lodash';
import { STATUS } from '../constants/status';
import { v4 as uuidv4 } from 'uuid';
import { ErrorThrow } from '../types/response.type';
import shelljs from 'shelljs';
import mv from 'mv';
import { Request } from 'express';

dotenv.config();

export class ErrorHandler extends Error {
  status: number;
  error: string | ErrorThrow;
  constructor(status: number, error: string | ErrorThrow) {
    super();
    this.status = status;
    this.error = error;
  }
}

export const isProduction =
  process.env.NODE_ENV === 'production' || process.argv[2] === 'production';

export const HOST = isProduction
  ? process.env.PRODUCTION_HOST
  : `http://${process.env.HOST}:${process.env.PORT}`;

export const handleImageProduct = (product: any) => {
  if (product.image !== undefined && product.image !== '') {
    product.image = HOST + `/${ROUTE_IMAGE}/` + product.image;
  }
  if (product.images !== undefined && product.images.length !== 0) {
    product.images = product.images.map((image: string) => {
      return image !== '' ? HOST + `/${ROUTE_IMAGE}/` + image : '';
    });
  }
  return product;
};

export const hashPasswordValue = (value: string) => {
  // Create Hash instance with createHash
  const hash = crypto
    .createHash('sha256')
    // Use update to add data
    .update(value)
    // Use digest to get the hash value
    .digest('hex');
  return hash;
};

// Compare  the original password with the hashed password
export const compareHashPassword = (
  password: string,
  hashedPassword: string,
) => {
  if (hashPasswordValue(password) === hashedPassword) {
    return true;
  }
  return false;
};

export const isMongoIdFunc = (id: any) => mongoose.Types.ObjectId.isValid(id);

export const removeImageProduct = (image: any) => {
  if (image !== undefined && image !== '') {
    fs.unlink(`${FOLDER_UPLOAD}/${FOLDERS.PRODUCT}/${image}`, (err: any) => {
      if (err) console.error(err);
    });
  }
};

export const removeManyImageProduct = (images: string[]) => {
  if (images !== undefined && images.length > 0) {
    images.forEach((image) => {
      removeImageProduct(image);
    });
  }
};

const getExtension = (filename: string) => {
  const ext = /(?:\.([^.]+))?$/.exec(filename);
  if (ext) return ext[1];
  return null;
};

const upload = (image: any, folder: any) => {
  return new Promise((resolve, reject) => {
    const dir = `${FOLDER_UPLOAD}${folder ? '/' + folder : ''}`;
    if (!fs.existsSync(dir)) {
      shelljs.mkdir('-p', dir);
    }
    const tmpPath = image.path;
    const newName = uuidv4() + '.' + getExtension(image.name);
    const newPath = dir + '/' + newName;
    mv(tmpPath, newPath, function (err: any) {
      if (err)
        return reject(
          new ErrorHandler(
            STATUS.INTERNAL_SERVER_ERROR,
            'changing file name failed',
          ),
        );
      resolve(newName);
    });
  });
};

export const uploadFile = (req: Request, folder = '') => {
  return new Promise<string>((resolve, reject) => {
    const form: any = new IncomingForm();
    form.parse(req, function (error: any, fields: any, files: any) {
      if (error) {
        return reject(error);
      }
      try {
        const { image }: { image: any } = files;
        const errorEntity: any = {};
        if (!image) {
          errorEntity.image = 'image not found';
        } else if (!image.type.includes('image')) {
          errorEntity.image = 'image is not correct format';
        } else if (image.size > 1000000) {
          errorEntity.image = 'The image file size must be <= 1MB';
        }
        if (!isEmpty(errorEntity)) {
          return reject(
            new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, errorEntity),
          );
        }
        upload(image, folder)
          .then((res: any) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const uploadManyFile = (req: Request, folder = '') => {
  return new Promise<string[]>((resolve, reject) => {
    const form: any = new IncomingForm({ multiples: true });
    form.parse(req, function (error: any, fields: any, files: any) {
      if (error) {
        return reject(error);
      }
      try {
        const { images }: { images: any[] } = files;
        const errorEntity: any = {};
        if (!images) {
          errorEntity.image = 'images not found';
        } else if (images.some((image) => !image.type.includes('image'))) {
          errorEntity.image = 'image is not correct format';
        }
        if (!isEmpty(errorEntity)) {
          return reject(
            new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, errorEntity),
          );
        }
        const chainUpload = images.map((image) => {
          return upload(image, folder);
        });
        Promise.all(chainUpload)
          .then((res: any) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  });
};
