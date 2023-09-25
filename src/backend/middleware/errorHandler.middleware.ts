import { ErrorRequestHandler } from 'express';

import * as log from '@lib/log.lib';

type ErrorMessageMap = {
  [key: number]: string;
};

const errorMessageMap: ErrorMessageMap = {
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  try {
    if (err.isTrusted) {
      log.warn(err.fullError());
    } else {
      log.error(err.fullError());
    }

    return res
      .status(err.code)
      .json({ data: null, error: errorMessageMap[err.code] });
  } catch (e) {
    log.error(`unexpected error: ${JSON.stringify(e, null ,2)}`);

    return res
      .status(500)
      .json({ data: null, error: errorMessageMap[500] });
  }

};

export default errorHandler;
