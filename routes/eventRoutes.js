const express = require('express');
const eventController = require('../controllers/eventController');
const { validate } = require('../middlewares/validate');
const eventValidation = require('../validations/eventValidation');
const router = express.Router();
const auth = require('../middlewares/auth');
router.post(
  '/create-event',
  auth,
  validate(eventValidation.createEvent),
  eventController.createEvent
);

router.get('/get-events', auth, eventController.getEvents);
router.get(
  '/get-event/:eventId',
  validate(eventValidation.findEvent),
  eventController.getEventByEventId
);
router.post(
  '/delete-event',
  auth,
  validate(eventValidation.deleteEvent),
  eventController.deleteEvent
);
router.post(
  '/set-default-link',
  auth,
  validate(eventValidation.defaultLink),
  eventController.setDefaultMode
);
router.post('/delete-default-link', auth, eventController.setDefaultMode);
module.exports = router;
