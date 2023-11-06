import { body } from 'express-validator';
import { isMongoIdFunc } from '../utils/helper';

const addToCartRules = () => {
  return [
    body('product_id')
      .exists({ checkFalsy: true })
      .withMessage('product_id must not be empty')
      .isMongoId()
      .withMessage('product_id is not a correct format'),
    body('buy_count')
      .exists({ checkFalsy: true })
      .withMessage('buy_count must not be empty')
      .custom((value) => {
        if (
          typeof value !== 'number' ||
          value < 1 ||
          !Number.isInteger(value)
        ) {
          return false;
        }
        return true;
      })
      .withMessage('buy_count must be an integer number greater than 0'),
  ];
};

const deletePurchasesRules = () => {
  return [
    body()
      .isArray()
      .withMessage('body must be an array')
      .custom((value) => {
        if (value.length === 0) {
          return false;
        }
        return value.every((id: any) => isMongoIdFunc(id));
      })
      .withMessage('body must be an array if IDs'),
  ];
};

const buyProductsRules = () => {
  return [
    body()
      .isArray()
      .withMessage('body must be an array')
      .custom((value) => {
        if (value.length === 0) {
          return false;
        }
        const isPassed = value.every((item: any) => {
          if (
            isMongoIdFunc(item.product_id) &&
            Number.isInteger(item.buy_count)
          ) {
            return true;
          }
          return false;
        });
        return isPassed;
      })
      .withMessage('body is not a correct format'),
  ];
};

const updatePurchaseRules = addToCartRules;

export const purchaseMiddleware = {
  addToCartRules,
  deletePurchasesRules,
  buyProductsRules,
  updatePurchaseRules,
};
