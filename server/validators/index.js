const registerSchemaFacebook = require('./facebook_register.validator');
const registerSchemaEmail = require('./email_register.validator');

const loginSchemaEmail = require('./email_login.validator');

module.exports = {
  registerSchemaFacebook,
  registerSchemaEmail,
  loginSchemaEmail,
};
