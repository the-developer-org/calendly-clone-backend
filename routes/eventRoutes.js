const express = require('express');
const eventController = require('../controllers/eventController');
const { validate } = require('../middlewares/validate');
const eventValidation = require('../validations/eventValidation');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post(
  '/createevent',
  auth,
  validate(eventValidation.createEvent),
  eventController.createEvent
);

router.get('/getevents', auth, eventController.getEvents);

module.exports = router;
