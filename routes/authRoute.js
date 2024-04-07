const authController = require('../controllers/authController');
const express = require('express');
const authValidation = require('../validations/authValidations');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.post('/login', validate(authValidation.login), authController.logIn);
router.post('/signup', validate(authValidation.signup), authController.signUp);
router.post('/verify', validate(authValidation.verify), authController.verify);
module.exports = router;
