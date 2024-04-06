const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.post('/login', authController.logIn);
router.post('/signup', authController.signUp);

module.exports = router;
