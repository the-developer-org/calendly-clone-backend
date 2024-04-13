const adminService = require('../services/adminService');
const eventService = require('../services/eventService');
const ApiError = require('../util/ApiError');
const { catchAsync } = require('../util/async');
const {
  EVENT_CREATION_ERROR,
  EVENT_NOT_FOUND,
  BAD_REQUEST,
} = require('../util/errorMessages');
const sendSuccessRes = require('../util/sendSuccessRes');
const {
  EVENT_CREATED,
  FETCH_ALL_EVENTS,
  EVENT_DELETED,
  FETCH_EVENT_BYID,
  MODE_UPDATED,
} = require('../util/successMessages');

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

  /**
   * For getting the event by the id.
   * @function getEventByEventId
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise} Resolves when event-fetching process completes.
   */
  getEventByEventId: catchAsync(async (req, res) => {
    const findedEvent = await eventService.findEvent(req.params);
    if (!findedEvent) {
      const { code, name, message } = EVENT_NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    const { code, name, message } = FETCH_EVENT_BYID;
    return sendSuccessRes(res, message, code, name, findedEvent);
  }),

  /**
   * For deleting the event by the id.
   * @function deleteEvent
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise} Resolves when event-fetching process completes.
   */
  deleteEvent: catchAsync(async (req, res) => {
    await eventService.deleteEvent(req.body, req.admin);
    const { code, name, message } = EVENT_DELETED;
    return sendSuccessRes(res, message, code, name);
  }),
  /**
   * For setting default mode and link of for the admin.
   * @function setDefaultMode
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise} Resolves when event-fetching process completes.
   */
  setDefaultMode: catchAsync(async (req, res) => {
    await adminService.setDefaultMode(req.body, req.admin);
    const { code, name, message } = MODE_UPDATED;
    return sendSuccessRes(res, message, code, name);
  }),
  /**
   * For removing default mode and link of for the admin.
   * @function setDefaultMode
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise} Resolves when event-fetching process completes.
   */
  deleteDefaultMode: catchAsync(async (req, res) => {
    await adminService.removeDefaultMode(req.body, req.admin);
    const { code, name, message } = MODE_UPDATED;
    return sendSuccessRes(res, message, code, name);
  }),
};

module.exports = eventController;
