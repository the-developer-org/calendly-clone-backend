const ApiError = require('../util/ApiError');
const Event = require('../models/Event');
const { SLOT_CREATION_ERROR } = require('../util/errorMessages');
const { createSlots } = require('../util/helperFunctions');

const eventService = {
  createEvent: async (body, admin) => {
    const {
      name,
      mode,
      duration,
      startDate,
      endDate,
      startTime,
      endTime,
      meetingLink,
      bufferTime,
      description,
    } = body;

    const slots = createSlots(
      startDate,
      endDate,
      startTime,
      endTime,
      duration,
      bufferTime
    );
    if (!slots) {
      const { code, name, message } = SLOT_CREATION_ERROR;
      throw new ApiError(code, message, name);
    }
    return Event.create({
      name,
      duration,
      startDate,
      endDate,
      startTime,
      endTime,
      meetingLink,
      description,
      bufferTime,
      availableSlots: slots,
      mode,
      adminId: admin.id,
    });
  },

  getEvents: async (admin) => {
    return Event.findAll({ where: { adminId: admin.id, isActive: true } });
  },
};

module.exports = eventService;
