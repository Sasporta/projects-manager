import { createMocks } from 'node-mocks-http';

import errorHandler from '@middleware/errorHandler';
import {
  GeneralError,
  NotFoundError,
  ValidationError,
} from '@lib/customErrors';

describe('errorHandler', () => {
  const consoleWarnSpy = jest
    .spyOn(console, 'warn')
    .mockImplementation(() => {});

  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});;

  it('should return response with status code 404 and error message', () => {
    const { req, res } = createMocks();

    const mockNext = jest.fn();

    const error = new NotFoundError({ message: 'item not found' });

    errorHandler(error, req, res, mockNext);

    expect(consoleWarnSpy).toBeCalled();
    expect(consoleErrorSpy).not.toBeCalled();
    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({
      data: null,
      error: 'Not Found',
    });
  });

  it('should return response with status code 422 and error message', () => {
    const { req, res } = createMocks();

    const mockNext = jest.fn();

    const error = new ValidationError({ message: 'some validation error' });

    errorHandler(error, req, res, mockNext);

    expect(consoleWarnSpy).toBeCalled();
    expect(consoleErrorSpy).not.toBeCalled();
    expect(res._getStatusCode()).toBe(422);
    expect(JSON.parse(res._getData())).toEqual({
      data: null,
      error: 'Unprocessable Entity',
    });
  });

  it('should return response with status code 500 and error message', () => {
    const { req, res } = createMocks();

    const mockNext = jest.fn();

    const error = new GeneralError({ cause: new Error('something failed') });

    errorHandler(error, req, res, mockNext);

    expect(consoleWarnSpy).not.toBeCalled();
    expect(consoleErrorSpy).toBeCalled();
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      data: null,
      error: 'Internal Server Error',
    });
  });

  it('should return response with status code 500 and error message when error occur', () => {
    const { req, res } = createMocks();

    const mockNext = jest.fn();

    errorHandler(null, req, res, mockNext);

    expect(consoleErrorSpy).toBeCalled();
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      data: null,
      error: 'Internal Server Error',
    });
  });
});
