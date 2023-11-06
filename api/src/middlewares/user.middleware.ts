import { body } from 'express-validator';

const updateUserRules = () => {
  return [
    body('name')
      .if((value: string) => value !== undefined)
      .trim()
      .notEmpty()
      .withMessage('name cannot be empty')
      .isString()
      .withMessage('name must be a string')
      .isLength({ max: 160 })
      .withMessage('name cannot exceed 160 characters'),
    body('email')
      .if((value: string) => value !== undefined)
      .isEmail()
      .withMessage('Not a valid e-mail address'),
    body('date_of_birth')
      .if((value: Date) => value !== undefined)
      .isISO8601()
      .withMessage('birthday must be a valid date'),
    body('address')
      .if((value: string) => value !== undefined)
      .trim()
      .notEmpty()
      .withMessage('address cannot be empty')
      .isLength({ max: 160 })
      .withMessage('address cannot exceed 160 characters'),
    body('phone')
      .if((value: string) => value !== undefined)
      .isLength({ max: 20 })
      .withMessage('phone number cannot exceed 20 characters'),
    body('avatar')
      .if((value: string) => value !== undefined)
      .isString()
      .withMessage('avatar must be a string')
      .isLength({ max: 1000 })
      .withMessage('URL avatar cannot exceed 1000 characters'),
    body('password')
      .if((value: string) => value !== undefined)
      .isLength({ min: 8, max: 160 })
      .withMessage(
        'password must contain at least 8 characters & at most 160 characters',
      ),
    body('new_password')
      .if((value: string) => value !== undefined)
      .isLength({ min: 6, max: 160 })
      .withMessage(
        'password must contain at least 8 characters & at most 160 characters',
      ),
    body('roles')
      .if((value: any) => value !== undefined)
      .custom((value) => {
        if (!Array.isArray(value)) return false;
        if (value.some((item) => typeof item !== 'string')) return false;
        return true;
      })
      .withMessage('Roles are not correctly formatted'),
  ];
};

const addUserRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Not a valid e-mail address')
      .isLength({ min: 6, max: 160 })
      .withMessage(
        'email must contain at least 6 characters & at most 160 characters',
      ),
    body('name')
      .exists({ checkFalsy: true })
      .withMessage('name cannot be empty')
      .isLength({ max: 160 })
      .withMessage('name cannot exceed 160 characters'),
    body('password')
      .isLength({ min: 6, max: 160 })
      .withMessage(
        'password must contain at least 6 characters & at most 160 characters',
      ),
    body('date_of_birth')
      .if((value: any) => value !== undefined)
      .isISO8601()
      .withMessage('birthday must be correctly formatted'),
    body('address')
      .if((value: any) => value !== undefined)
      .isLength({ max: 160 })
      .withMessage('address cannot exceed 160 characters'),
    body('phone')
      .if((value: any) => value !== undefined)
      .isLength({ max: 20 })
      .withMessage('phone number cannot exceed 20 characters'),
    body('roles')
      .exists({ checkFalsy: true })
      .withMessage('Roles cannot be empty')
      .custom((value) => {
        if (!Array.isArray(value)) {
          return false;
        }
        if (value.some((item) => typeof item !== 'string')) {
          return false;
        }
        return true;
      })
      .withMessage('Roles must be correctly formatted'),
    body('avatar')
      .if((value: any) => value !== undefined)
      .isString()
      .withMessage('avatar must be a url string ')
      .isLength({ max: 1000 })
      .withMessage('URL avatar cannot exceed 1000 characters'),
  ];
};

const updateMeRules = () => {
  return [
    body('name')
      .if((value: string) => value !== undefined)
      .trim()
      .notEmpty()
      .withMessage('name cannot be empty')
      .isString()
      .withMessage('name must be a string')
      .isLength({ max: 160 })
      .withMessage('name cannot exceed 160 characters'),
    body('email')
      .if((value: string) => value !== undefined)
      .isEmail()
      .withMessage('Not a valid e-mail address'),
    body('date_of_birth')
      .if((value: Date) => value !== undefined)
      .isISO8601()
      .withMessage('birthday must be a valid date'),
    body('address')
      .if((value: string) => value !== undefined)
      .trim()
      .notEmpty()
      .withMessage('address cannot be empty')
      .isLength({ max: 160 })
      .withMessage('address cannot exceed 160 characters'),
    body('phone')
      .if((value: string) => value !== undefined)
      .isLength({ max: 20 })
      .withMessage('phone number cannot exceed 20 characters'),
    body('avatar')
      .if((value: string) => value !== undefined)
      .isString()
      .withMessage('avatar must be a string')
      .isLength({ max: 1000 })
      .withMessage('URL avatar cannot exceed 1000 characters'),
    body('password')
      .if((value: string) => value !== undefined)
      .isLength({ min: 8, max: 160 })
      .withMessage(
        'password must contain at least 8 characters & at most 160 characters',
      ),
    body('new_password')
      .if((value: string) => value !== undefined)
      .isLength({ min: 6, max: 160 })
      .withMessage(
        'password must contain at least 8 characters & at most 160 characters',
      ),
  ];
};

export const userMiddleware = { updateUserRules, updateMeRules, addUserRules };
