const express = require('express');
const slotController = require('../controllers/slotController');
const { validate } = require('../middlewares/validate');
const router = express.Router();
const slotValidation = require('../validations/slotValidation');
const auth = require('../middlewares/auth');
router.post(
  '/book-slot',
  validate(slotValidation.bookSlot),
  slotController.bookSlot
);
router.get('/get-booked-slots', auth, slotController.getBookedSlots);

module.exports = router;
