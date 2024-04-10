const Joi = require('joi');

exports.bookSlot = {
  body: Joi.object().keys({
    eventId: Joi.number().required(),
    userName: Joi.string().required(),
    userEmail: Joi.string().required(),
    date: Joi.date().required(),
    eventStartTime: Joi.string().required(),
    eventEndTime: Joi.string().required(),
  }),
};

module;
