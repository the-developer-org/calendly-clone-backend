const { generateToken, decodeToken } = require('../util/helperFunctions');
const { catchAsync } = require('../util/async');
const sendSuccessRes = require('../util/sendSuccessRes');
const ApiError = require('../util/ApiError');
const authService = require('../services/authService');
const adminService = require('../services/adminService');
const emailService = require('../services/emailServices');
const { v4: uuidv4 } = require('uuid');
const {
  GENERATE_TOKEN_ERROR,
  DECODE_TOKEN_ERROR,
  EMAIL_ERROR,
} = require('../util/errorMessages');
const {
  ACCOUNT_CREATED,
  LOGIN_SUCCESS,
  USER_VERFIED,
} = require('../util/successMessages');
const { database } = require('../config/database');

const authController = {
  /**
   * Handles Admin signup.
   * @function signUp
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Resolves when sign-up process completes.
   */

  signUp: catchAsync(async (req, res) => {
    const token = uuidv4();
    let transaction = await database.transaction();
    try {
      await authService.createAdmin(req.body, token, transaction);
      const email = await emailService.sendVerificationEmail(req.body, token);
      if (email) {
        const { code, name, message } = ACCOUNT_CREATED;
        const result = {
          name: req.body.name,
          email: req.body.email,
        };
        await transaction.commit();
        return sendSuccessRes(res, message, code, name, result);
      }
      const { code, error, message } = EMAIL_ERROR;
      throw new ApiError(code, message, error);
    } catch (error) {
      await transaction.rollback();
      throw new ApiError(error.statusCode, error.message, error.name);
    }
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
      defaultMode: admin.defaultMode,
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
      defaultMode: admin.defaultMode,
    };
    return sendSuccessRes(res, message, code, name, result);
  }),
  verifyEmail: catchAsync(async (req, res) => {
    const user = await adminService.verifyUser(req.params.token);
    if (!user) {
      // Prepare HTML for unauthorized access or failed verification
      const htmlResponse = `<html>
        <head><title>Email Verification Failed</title></head>
        <body>
          <h1>Verification Failed</h1>
          <p>Your email could not be verified. Please ensure you have used the correct verification link or contact support.</p>
        </body>
      </html>`;
      res.status(204).send(htmlResponse);
    } else {
      // Prepare HTML for successful verification
      const htmlResponse = `<html>
        <head><title>Email Verified</title></head>
        <body>
          <h1>Verification Successful</h1>
          <p>Thank you! Your email has been successfully verified.</p>
        </body>
      </html>`;
      res.status(200).send(htmlResponse);
    }
  }),
};

module.exports = authController;
