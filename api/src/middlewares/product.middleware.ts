import { body, query } from 'express-validator';

const getProductsRules = () => {
  return [
    query('page')
      .if((value: any) => value !== undefined)
      .isInt()
      .withMessage('page is incorrect format'),
    query('limit')
      .if((value: any) => value !== undefined)
      .isInt()
      .withMessage('limit is incorrect format'),
    query('category')
      .if((value: any) => value !== undefined)
      .isMongoId()
      .withMessage('category is incorrect format'),
    query('exclude')
      .if((value: any) => value !== undefined)
      .isMongoId()
      .withMessage('exclude is incorrect format'),
  ];
};

const addProductRules = () => {
  return [
    body('name')
      .exists({ checkFalsy: true })
      .withMessage('The name must not be empty')
      .isLength({ max: 160 })
      .withMessage('The name must be less than 160 characters'),
    body('image')
      .exists({ checkFalsy: true })
      .withMessage('The image must not be empty')
      .isLength({ max: 1000 })
      .withMessage('The image url must be less than 1000 characters'),
    body('images')
      .if((value: any) => value !== undefined)
      .isArray()
      .withMessage('Images must be of type string[]'),
    body('category')
      .exists({ checkFalsy: true })
      .withMessage('Category must not be empty')
      .isMongoId()
      .withMessage(`category id must be of type ObjectId`),
    body('price')
      .if((value: any) => value !== undefined)
      .isNumeric()
      .withMessage('Price must be a number '),
    body('price_before_discount')
      .if((value: any) => value !== undefined)
      .isNumeric()
      .withMessage('price_before_discount  must be a number '),
    body('quantity')
      .if((value: any) => value !== undefined)
      .isNumeric()
      .withMessage('quantity must be a number'),
    body('view')
      .if((value: any) => value !== undefined)
      .isNumeric()
      .withMessage('view must be a number'),
    body('sold')
      .if((value: any) => value !== undefined)
      .isNumeric()
      .withMessage('sold must be a number'),
    body('rating')
      .if((value: any) => value !== undefined)
      .isNumeric()
      .withMessage('rating must be a number'),
  ];
};

const updateProductRules = () => {
  return addProductRules();
};

export const productMiddleware = {
  getProductsRules,
  addProductRules,
  updateProductRules,
};
