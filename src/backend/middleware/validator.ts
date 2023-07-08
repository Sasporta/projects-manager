import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import getReqData from '../utils/getReqData';

const validator = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const reqData = getReqData(req);

    const { error } = schema.validate(reqData);

    if (error) {
      const { details } = error;

      const message = details.map(err => err.message).join(',');

      // TODO: implement logger
      console.log('error', message);

      return res.status(422).json({ data: null, error: message });
    }

    next();
  };
};

export default validator;
