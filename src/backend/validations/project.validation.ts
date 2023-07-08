import Joi from 'joi';

export const getOneValidation = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});

export const postValidation = Joi.object({
  body: Joi.object({
    name: Joi.string().alphanum().min(1).max(30).required(),
    description: Joi.string().alphanum().min(1).max(100).required(),
    url: Joi.string().uri().min(1).max(50).required(),
    lastMaintenance: Joi.date().optional(),
    nextMaintenance: Joi.date().optional(),
  }),
});
