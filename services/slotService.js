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
  getBookedSlots: async ({ id }, { current: page, rows: pageSize }) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    const result = await Slot.findAndCountAll({
      attributes: ['eventDate', 'eventStartTime', 'eventEndTime', 'id'],
      include: [
        {
          model: Event,
          attributes: ['name', 'mode'],
          where: { adminId: id, isActive: true },
        },
        {
          model: User,
          attributes: ['email', 'name'],
        },
      ],
      limit: limit,
      offset: offset,
      order: [['eventDate', 'ASC']],
    });
    return {
      total: result.count,
      totalPages: Math.ceil(result.count / pageSize),
      slots: result.rows.map((slot) => ({
        slotId: slot.id,
        eventName: slot.event.name,
        mode: slot.event.mode,
        eventDate: slot.eventDate,
        eventStartTime: slot.eventStartTime,
        eventEndTime: slot.eventEndTime,
        userEmail: slot.user.email,
        userName: slot.user.name,
      })),
    };
  },
};

module.exports = slotService;
