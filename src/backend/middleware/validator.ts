import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import getReqData from '@utils/getReqData';

const validator = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqData = getReqData(req);

      const { error } = schema.validate(reqData);

      if (error) {
        const { details } = error;

        const message = details.map(err => err.message).join(',');

        // TODO: implement logger
        console.log('error', message);

        return res
          .status(422)
          .json({ data: null, error: 'Unprocessable Entity' });
      }

      next();
    } catch (e) {
      if (e instanceof Error) {
        const args = `e.stack: ${e.stack}`;

        // TODO: replace with logger
        console.error(`validator, ${args}`);
      }

      // TODO: create a custom error handler
      return res
        .status(500)
        .json({ data: null, error: 'Internal Server Error' });
    }
  };
};

export default validator;
