const Joi = require('joi');

exports.createEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    mode: Joi.string().required(),
    duration: Joi.number().required(),
    startDate: Joi.object().required(),
    endDate: Joi.object().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    meetingLink: Joi.string().required(),
    bufferTime: Joi.number().required(),
    description: Joi.string().required(),
  }),
};
