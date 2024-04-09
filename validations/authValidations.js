const Joi = require('joi');
const { password } = require('./customValidation');

exports.signup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

exports.login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};
exports.verify = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
exports.auth = {
  headers: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

exports.verifyEmail = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
