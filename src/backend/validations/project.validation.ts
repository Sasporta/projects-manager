import Joi from 'joi';

export const getOne = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});

export const post = Joi.object({
  body: Joi.object({
    name: Joi.string().alphanum().min(1).max(30).required(),
    description: Joi.string().alphanum().min(1).max(100).required(),
    url: Joi.string().uri().min(1).max(50).required(),
  }),
});
