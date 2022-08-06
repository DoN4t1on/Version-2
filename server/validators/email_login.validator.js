const Joi = require('joi');

const loginSchemaEmail = Joi.object({
  username: Joi.string().required(),
  pass: Joi.string().required().min(8),
});

module.exports = loginSchemaEmail;
