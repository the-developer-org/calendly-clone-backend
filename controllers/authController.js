const { generateToken, decodeToken } = require('../util/helperFunctions');
const { catchAsync } = require('../util/async');
const sendSuccessRes = require('../util/sendSuccessRes');
const ApiError = require('../util/ApiError');
const authService = require('../services/authService');
const {
  GENERATE_TOKEN_ERROR,
  DECODE_TOKEN_ERROR,
} = require('../util/errorMessages');
const {
  ACCOUNT_CREATED,
  LOGIN_SUCCESS,
  USER_VERFIED,
} = require('../util/successMessages');

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
    const result = {
      token,
      name: req.body.name,
      email: req.body.email,
    };

    return sendSuccessRes(res, message, code, name, result);
  }),

  /**
   * Handles admin login.
   * @function logIn
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Resolves when login process completes.
   */
  logIn: catchAsync(async (req, res) => {
    const admin = await authService.loginAdmin(req.body);
    const token = generateToken(req.body);
    if (!token) {
      const { code, error, message } = GENERATE_TOKEN_ERROR;
      throw new ApiError(code, message, error);
    }
    const { code, name, message } = LOGIN_SUCCESS;
    const result = {
      token,
      name: admin.name,
      email: admin.email,
    };
    return sendSuccessRes(res, message, code, name, result);
  }),

  /**
   * Handles verfication for admin.
   * @function verify
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Resolves when login process completes.
   */
  verify: catchAsync(async (req, res) => {
    const decodedToken = decodeToken(req.body.token);

    if (!decodedToken) {
      const { code, message, name } = DECODE_TOKEN_ERROR;
      throw new ApiError(code, message, name);
    }
    const admin = await authService.verifyAdmin(decodedToken);
    const { code, name, message } = USER_VERFIED;
    const result = {
      name: admin.name,
      token: req.body.token,
      email: admin.email,
    };
    return sendSuccessRes(res, message, code, name, result);
  }),
};

module.exports = authController;
