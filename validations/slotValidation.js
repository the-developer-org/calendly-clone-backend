const Joi = require('joi');

exports.bookSlot = {
  body: Joi.object().keys({
    eventId: Joi.number().required(),
    userName: Joi.string().required(),
    userEmail: Joi.string().required(),
    eventDate: Joi.date().required(),
    eventStartTime: Joi.string().required(),
    eventEndTime: Joi.string().required(),
    eventName: Joi.string().required(),
    eventLink: Joi.string().required(),
  }),
};

exports.getSlot = {
  body: Joi.object().keys({
    eventId: Joi.number().required(),
    userId: Joi.number().required(),
  }),
};

module;
