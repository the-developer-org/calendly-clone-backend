const eventService = require('../services/eventService');
const ApiError = require('../util/ApiError');
const { catchAsync } = require('../util/async');
const { EVENT_NOT_FOUND, SLOT_BOOK_ERROR } = require('../util/errorMessages');
const userService = require('../services/userService');
const slotService = require('../services/slotService');
const sendSuccessRes = require('../util/sendSuccessRes');
const { SLOT_CREATED, FETCH_ALL_SLOTS } = require('../util/successMessages');
const { database } = require('../config/database');
const emailService = require('../services/emailServices');

/**
 * For book a new slot.
 * @function slotController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} Resolves when slot book process completes.
 */
const slotController = {
  bookSlot: catchAsync(async (req, res) => {
    const findEvent = await eventService.findEvent(req.body);
    if (!findEvent) {
      const { code, name, message } = EVENT_NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    let transaction;
    try {
      transaction = await database.transaction();
      const createdUser = await userService.createUser(req.body, transaction);
      const createdSlot = await slotService.createSlot(
        req.body,
        transaction,
        createdUser,
        findEvent
      );
      await eventService.updateEventSlotAvalibility(
        findEvent,
        req.body,
        transaction
      );
      await emailService.sendBookingConfirmationEmail(req.body);
      await transaction.commit();
      const { code, name, message } = SLOT_CREATED;
      return sendSuccessRes(res, message, code, name, createdSlot);
    } catch (error) {
      console.log(errors);
      await transaction.rollback();
      const { code, message, name } = SLOT_BOOK_ERROR;
      throw new ApiError(code, message, name);
    }
  }),

  /**
   * For fetching all the book slots .
   * @function getBookedSlots
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise} Resolves when slot book process completes.
   */
  getBookedSlots: catchAsync(async (req, res) => {
    const bookedSlots = await slotService.getBookedSlots(req.admin);
    const transformedData = bookedSlots.flatMap((event) => {
      return event.slots.map((slot) => {
        return {
          eventName: event.name,
          mode: event.mode,
          eventDate: slot.eventDate,
          eventStartTime: slot.eventStartTime,
          eventEndTime: slot.eventEndTime,
          id: slot.id,
          userEmail: slot.user.email,
          userName: slot.user.name,
        };
      });
    });
    const { code, name, message } = FETCH_ALL_SLOTS;
    return sendSuccessRes(res, message, code, name, transformedData);
  }),
};

module.exports = slotController;
