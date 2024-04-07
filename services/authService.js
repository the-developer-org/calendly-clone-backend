const adminService = require('./adminService');
const Admin = require('../models/Admin');
const ApiError = require('../util/ApiError');
const {
  EMAIL_ALREADY_IN_USE,
  USER_NOT_FOUND,
  PASSWORD_MISSMATCH,
  GENERATE_HASH_ERROR,
} = require('../util/errorMessages');
const {
  generateHashPassword,
  checkPassword,
} = require('../util/helperFunctions');

const authService = {
  /**
   * Creates a new admin account.
   * @param {Object} adminData - The admin data including name, email, and password.
   * @returns {Promise<Object>} A Promise resolving to the created admin object.
   */
  createAdmin: async ({ name, email, password }) => {
    if (await adminService.findAdminByEmail(email)) {
      const { code, message, name } = EMAIL_ALREADY_IN_USE;
      throw new ApiError(code, message, name);
    }
    password = await generateHashPassword(password, 10);

    if (!password) {
      const { code, message, name } = GENERATE_HASH_ERROR;
      throw new ApiError(code, message, name);
    }

    return Admin.create({ name, email, password });
  },

  /**
   * Logs in an admin.
   * @param {Object} credentials - The admin credentials including email and password.
   * @returns {Promise<void>} Resolves if login is successful.
   */

  loginAdmin: async ({ email, password }) => {
    const findAdmin = await adminService.findAdminByEmail(email);
    if (!findAdmin) {
      const { code, message, name } = USER_NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    const isValidPassword = await checkPassword(password, findAdmin.password);
    if (!isValidPassword) {
      const { code, message, name } = PASSWORD_MISSMATCH;
      throw new ApiError(code, message, name);
    }
  },

  /**
   * Verifies admin credentials.
   * @param {Object} credentials - The admin credentials including email and password.
   * @returns {Promise<void>} Resolves if credentials are valid.
   */
  verifyAdmin: async ({ email, password }) => {
    const findAdmin = await adminService.findAdminByEmail(email);
    if (!findAdmin) {
      const { code, message, name } = USER_NOT_FOUND;
      throw new ApiError(code, message, name);
    }

    const isValidPassword = await checkPassword(password, findAdmin.password);
    if (!isValidPassword) {
      const { code, message, name } = PASSWORD_MISSMATCH;
      throw new ApiError(code, message, name);
    }
  },
};

module.exports = authService;
