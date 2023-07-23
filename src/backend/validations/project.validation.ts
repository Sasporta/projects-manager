import Joi from 'joi';

import * as validations from '@common/common.validations';

export const getOne = Joi.object({
  params: Joi.object({
    id: validations.uuid,
  }).required(),
});

export const post = Joi.object({
  body: Joi.object({
    name: validations.name,
    description: validations.description,
    url: validations.url,
  }).required(),
});

export const put = Joi.object({
  params: Joi.object({
    id: validations.uuid,
  }).required(),
  body: Joi.object({
    name: validations.name,
    description: validations.description,
    url: validations.url,
  }).required(),
});

export const remove = Joi.object({
  params: Joi.object({
    id: validations.uuid,
  }).required(),
});
