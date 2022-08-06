const Joi = require('joi');

const registerSchemaEmail = Joi.object({
  email: Joi.string().email().lowercase().required(),

  username: Joi.string().required(),
  pass: Joi.string().required().min(8),
});

module.exports = registerSchemaEmail;
