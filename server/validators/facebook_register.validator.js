const Joi = require('joi');

const registerSchemaFacebook = Joi.object({
  email: Joi.string().email().lowercase().required(),
  id: Joi.string().required(),
  fname: Joi.string().required(),
  pic: Joi.string().required(),
});

module.exports = registerSchemaFacebook;
