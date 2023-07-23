import { ErrorRequestHandler } from 'express';

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
      // TODO: replace with logger
      console.warn(err.fullError());
    } else {
      // TODO: replace with logger
      console.error(err.fullError());
    }

    return res
      .status(err.code)
      .json({ data: null, error: errorMessageMap[err.code] });
  } catch (e) {
    // TODO: replace with logger
    console.error('unexpected error: ', e);

    return res
      .status(500)
      .json({ data: null, error: errorMessageMap[500] });
  }

};

export default errorHandler;
