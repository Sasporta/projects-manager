import Joi from 'joi';

export const uuid = Joi.string().uuid().required();

export const url = Joi.string().uri().min(1).max(50).required();

export const name = Joi.string().alphanum().min(1).max(30).required();

export const description = Joi.string()
  .regex(/^[a-zA-Z,. ]*$/)
  .min(1)
  .max(100)
  .required();
