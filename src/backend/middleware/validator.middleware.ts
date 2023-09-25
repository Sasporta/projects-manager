import Joi from 'joi';
import { RequestHandler } from 'express';

import getReqData from '@utils/getReqData.util';
import {
  ExtendedError,
  GeneralError,
  ValidationError,
} from '@lib/customErrors.lib';

type Validator = (schema: Joi.Schema) => RequestHandler;

const validator: Validator = schema => (req, res, next) => {
  try {
    const reqData = getReqData(req);

    const { error } = schema.validate(reqData);

    if (error) {
      const { details } = error;

      const message = details.map(err => err.message).join(',');

      throw new ValidationError({ message });
    }

    next();
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export default validator;
