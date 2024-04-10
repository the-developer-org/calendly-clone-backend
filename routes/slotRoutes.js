const express = require('express');
const slotController = require('../controllers/slotController');
const { validate } = require('../middlewares/validate');
const router = express.Router();
const slotValidation = require('../validations/slotValidation');

router.post(
  '/book-slot',
  validate(slotValidation.bookSlot),
  slotController.bookSlot
);

module.exports = router;
