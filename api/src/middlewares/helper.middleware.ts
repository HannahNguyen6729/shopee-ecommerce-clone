import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../constants/status';
import { body, check, validationResult } from 'express-validator';
import { isMongoIdFunc } from '../utils/helper';

const entityValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const error = errors
    .array({ onlyFirstError: true })
    .reduce((result: any, item: any, index) => {
      result[item.path] = item.msg;
      return result;
    }, {});

  return res.status(STATUS.UNPROCESSABLE_ENTITY).send({ message: error });
};

const idRule = (...id: string[]) => {
  return id.map((item) => {
    return check(item).isMongoId().withMessage(`${item} is incorrect format`);
  });
};

const idValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const error = errors
    .array({ onlyFirstError: true })
    .reduce((result: any, item: any, index) => {
      result[item.path] = item.msg;
      return result;
    }, {});

  return res.status(STATUS.BAD_REQUEST).send({ message: error });
};

const listIdRule = (list_id: string) => {
  return body(list_id)
    .custom((value: string[]) =>
      value.findIndex((item) => !isMongoIdFunc(item)),
    )
    .withMessage(`${list_id} is invalid`);
};

export const helpersMiddleware = {
  entityValidator,
  idRule,
  idValidator,
  listIdRule,
};
