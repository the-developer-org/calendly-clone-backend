const ApiError = require('../util/ApiError');
const Event = require('../models/Event');
const {
  SLOT_CREATION_ERROR,
  SLOT_NOT_FOUND,
} = require('../util/errorMessages');
const { createSlots, updateAvailability } = require('../util/helperFunctions');

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

  findEvent: async (body) => {
    return Event.findOne({ where: { id: body.eventId } });
  },

  updateEventSlotAvalibility: async (event, body, transaction) => {
    const { date, eventStartTime, eventEndTime } = body;
    const updatedSlots = updateAvailability(
      event.availableSlots,
      date,
      eventStartTime,
      eventEndTime
    );

    if (!updatedSlots) {
      const { code, name, message } = SLOT_NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    return Event.update(
      { availableSlots: updatedSlots },
      { where: { id: event.id } },
      transaction
    );
  },

  deleteEvent: async (body, admin) => {
    return Event.update(
      { isActive: false },
      { where: { id: body.eventId, adminId: admin.id } }
    );
  },
};

module.exports = eventService;
