const eventService = require('../services/eventService');
const ApiError = require('../util/ApiError');
const { catchAsync } = require('../util/async');
const { EVENT_CREATION_ERROR } = require('../util/errorMessages');
const sendSuccessRes = require('../util/sendSuccessRes');
const { EVENT_CREATED, FETCH_ALL_EVENTS } = require('../util/successMessages');

const eventController = {
  /**
   * Handles create event.
   * @function createEvent
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise} Resolves when event-creation process completes.
   */
  createEvent: catchAsync(async (req, res) => {
    const createdEvent = await eventService.createEvent(req.body, req.admin);
    if (!createdEvent) {
      const { code, name, message } = EVENT_CREATION_ERROR;
      throw new ApiError(code, message, name);
    }

    const { code, name, message } = EVENT_CREATED;
    return sendSuccessRes(res, message, code, name, createdEvent);
  }),

  /**
   * For getting all the events.
   * @function getEvents
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise} Resolves when event-fetching process completes.
   */
  getEvents: catchAsync(async (req, res) => {
    const allEvents = await eventService.getEvents(req.admin);
    const { code, name, message } = FETCH_ALL_EVENTS;
    return sendSuccessRes(res, message, code, name, allEvents);
  }),
};

module.exports = eventController;
