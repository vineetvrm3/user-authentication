const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  name: Joi.string(),
  location: Joi.string(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});


module.exports = {
  userSchema,
};
