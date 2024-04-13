const Joi = require('joi');

exports.createEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    mode: Joi.string().required(),
    duration: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    meetingLink: Joi.string().required(),
    bufferTime: Joi.number().required(),
    description: Joi.string().required(),
    color: Joi.string().required(),
  }),
};

exports.deleteEvent = {
  body: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
};
exports.findEvent = {
  params: Joi.object().keys({
    eventId: Joi.number().required(),
  }),
};
exports.defaultLink = {
  body: Joi.object().keys({
    mode: Joi.string().required(),
    meetingLink: Joi.string().required(),
  }),
};
