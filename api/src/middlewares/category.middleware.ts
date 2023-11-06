import { body, query } from 'express-validator';

const getCategoryRules = () => {
  return [
    query('exclude')
      .if((value: any) => value)
      .isMongoId()
      .withMessage('incorrect format exclude query parameter'),
  ];
};

const addCategoryRules = () => {
  return [
    body('name')
      .exists({ checkFalsy: true })
      .withMessage('name cannot be empty')
      .isLength({ max: 160 })
      .withMessage('name must be less than 160 characters'),
  ];
};

const updateCategoryRules = () => {
  return addCategoryRules();
};

export const categoryMiddleware = {
  getCategoryRules,
  addCategoryRules,
  updateCategoryRules,
};
