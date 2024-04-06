const {
  generateHashPassword,
  generateToken,
  checkPassword,
} = require('../util/helperFunctions');
const {
  EMAIL_ALREADY_IN_USE,
  NOT_FOUND,
  PASSWORD_MISSMATCH,
} = require('../util/errorMessages');

const { catchAsync } = require('../util/async');
const ApiError = require('../util/ApiError');
const sendSuccessRes = require('../util/sendSuccessRes');
const adminService = require('../services/adminService');

const authController = {
  // Sign up new admin
  signUp: catchAsync(async (req, res) => {
    // Extracting required data from request body
    const { name, email, password } = req.body;

    // Checking if the email is already in use
    const findAdmin = await adminService.findAdminByEmail(email);
    if (findAdmin) {
      // Handling email already in use error
      const { name, code, message } = EMAIL_ALREADY_IN_USE;
      throw new ApiError(code, message, name);
    }

    // Generating hash password and creating new admin
    const hashPassword = await generateHashPassword(password, 10);
    await adminService.createAdmin(name, email, hashPassword);
    const generatedToken = generateToken({ email, password });

    // Sending success response to client
    return sendSuccessRes(res, 'Account created', 200, {
      token: generatedToken,
    });
  }),

  // Login for admin
  logIn: catchAsync(async (req, res) => {
    // Extracting email and password from request body
    const { email, password } = req.body;

    // Finding admin by email
    const findAdmin = adminService.findAdminByEmail(email);
    if (!findAdmin) {
      // Handling admin not found error
      const { name, code, message } = NOT_FOUND;
      throw new ApiError(code, message, name);
    }

    // Checking password match
    const checkPwd = await checkPassword(password, findAdmin.password);
    if (!checkPwd) {
      // Handling password mismatch error
      const { name, code, message } = PASSWORD_MISSMATCH;
      throw new ApiError(code, message, name);
    }

    // Generating token for successful login
    const generatedToken = generateToken({ email, password });

    // Sending success response to client
    return sendSuccessRes(res, 'Login Successfully', 200, {
      token: generatedToken,
    });
  }),
};

module.exports = authController;
