const Event = require('../models/Event');
const Slot = require('../models/Slot');
const User = require('../models/User');

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
  getBookedSlots: async ({ id }) => {
    return Event.findAll({
      attributes: ['name', 'mode'],
      where: { adminId: id, isActive: true },
      include: [
        {
          model: Slot,
          attributes: ['eventDate', 'eventStartTime', 'eventEndTime', 'id'],
          include: [{ model: User, attributes: ['email', 'name'] }],
        },
      ],
    });
  },
};

module.exports = slotService;
