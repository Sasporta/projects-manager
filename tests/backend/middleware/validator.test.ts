import { randomUUID } from 'crypto';
import { NextFunction } from 'express';
import { createMocks } from 'node-mocks-http';

import validator from '@middleware/validator';
import * as projectValidations from '@validations/project.validation';

describe('validator', () => {
  it('should call next function when validation valid', () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: randomUUID() },
    });

    const mockNext = jest.fn() as NextFunction;

    validator(projectValidations.getOne)(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should return an error with status code 422 when validation invalid', () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: 'invalid-uuid' },
    });

    const mockNext = jest.fn() as NextFunction;

    validator(projectValidations.getOne)(req, res, mockNext);

    expect(res._getStatusCode()).toBe(422);
    expect(JSON.parse(res._getData())).toEqual({
      data: null,
      error: 'Unprocessable Entity',
    });
  });

  it('should return an error with status code 500', () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: randomUUID() },
    });

    const mockNext = jest.fn().mockImplementation(() => {
      throw new Error('something failed');
    });

    validator(projectValidations.getOne)(req, res, mockNext);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      data: null,
      error: 'Internal Server Error',
    });
  });
});
