const Slot = require('../models/Slot');

const slotService = {
  createSlot: async (body, transaction = null, user, event) => {
    const { eventDate, eventStartTime, eventEndTime } = body;
    const options = transaction ? { transaction } : {};
    return Slot.create(
      {
        eventDate,
        eventStartTime,
        eventEndTime,
        eventId: event.id,
        userId: user.id,
      },
      options
    );
  },
};

module.exports = slotService;
