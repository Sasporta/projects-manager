import { randomUUID } from 'crypto';
import { createMocks } from 'node-mocks-http';

import validator from '@middleware/validator.middleware';
import { GeneralError, ValidationError } from '@lib/customErrors.lib';
import * as projectValidations from '@validations/project.validation';

describe('validator', () => {
  it('should call next function when validation valid', () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: randomUUID() },
    });

    const mockNext = jest.fn();

    validator(projectValidations.getOne)(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next function with ValidationError when validation invalid', () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: 'invalid-uuid' },
    });

    const mockNext = jest.fn();

    validator(projectValidations.getOne)(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new ValidationError({ message: '"params.id" must be a valid GUID' }),
    );
  });

  it('should call next function with GeneralError when error occur', () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: randomUUID() },
    });

    const mockNext = jest.fn().mockImplementationOnce(() => {
      throw new Error('something failed');
    });

    validator(projectValidations.getOne)(req, res, mockNext);

    expect(mockNext).toHaveBeenNthCalledWith(
      2,
      new GeneralError({ cause: new Error('something failed') }),
    );
  });
});
