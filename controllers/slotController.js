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
    let transaction = await database.transaction();
    try {
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
      const data = await emailService.sendBookingConfirmationEmail(req.body);
      if (data) {
        await transaction.commit();
        const { code, name, message } = SLOT_CREATED;
        return sendSuccessRes(res, message, code, name, createdSlot);
      }
    } catch (error) {
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
    const bookedSlots = await slotService.getBookedSlots(req.admin, req.query);
    const { code, name, message } = FETCH_ALL_SLOTS;
    return sendSuccessRes(res, message, code, name, bookedSlots);
  }),
};

module.exports = slotController;
