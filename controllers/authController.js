const { generateToken } = require('../util/helperFunctions');
const { catchAsync } = require('../util/async');
const sendSuccessRes = require('../util/sendSuccessRes');
const ApiError = require('../util/ApiError');
const authService = require('../services/authService');
const { GENERATE_TOKEN_ERROR } = require('../util/errorMessages');
const { ACCOUNT_CREATED, LOGIN_SUCCESS } = require('../util/successMessages');

const authController = {
  /**
   * Handles Admin signup.
   * @function signUp
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Resolves when sign-up process completes.
   */

  signUp: catchAsync(async (req, res) => {
    await authService.createAdmin(req.body);
    const token = generateToken(req.body);
    if (!token) {
      const { code, error, message } = GENERATE_TOKEN_ERROR;
      throw new ApiError(code, message, error);
    }
    const { code, name, message } = ACCOUNT_CREATED;
    return sendSuccessRes(res, message, code, name);
  }),

  /**
   * Handles admin login.
   * @function logIn
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Resolves when login process completes.
   */
  logIn: catchAsync(async (req, res) => {
    await authService.loginAdmin(req.body);
    const token = generateToken(req.body);
    if (!token) {
      const { code, error, message } = GENERATE_TOKEN_ERROR;
      throw new ApiError(code, message, error);
    }
    const { code, name, message } = LOGIN_SUCCESS;
    return sendSuccessRes(res, message, code, name);
  }),
};

module.exports = authController;
