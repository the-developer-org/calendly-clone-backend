const { where } = require('sequelize');
const Admin = require('../models/Admin');
const ApiError = require('../util/ApiError');
const { NOT_FOUND } = require('../util/errorMessages');

const adminService = {
  /**
   * Finds an admin by email.
   * @param {string} email - The email of the admin to find.
   * @returns {Promise<Object|null>} A Promise resolving to the admin object if found, otherwise null.
   */
  findAdminByEmail: async (email) => {
    return Admin.findOne({ where: { email: email } });
  },
  /**
   * Finds an admin by id.
   * @param {string} id - The id of the admin to find.
   * @returns {Promise<Object|null>} A Promise resolving to the admin object if found, otherwise null.
   */
  findAdminById: async (id) => {
    return Admin.findByPk(id);
  },
  /**
   * Sets default mode and meeting link.
   * @param {string} mode
   * @param {string} meetingLink
   * @param {string} id details to be updated and id of admin
   * @returns {Promise<Object|null>} A Promise resolving to the admin object if found, otherwise null.
   */
  setDefaultMode: async ({ mode, meetingLink }, { id }) => {
    const admin = await adminService.findAdminById(id);
    if (!admin) {
      const { code, message, name } = NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    admin.defaultMode = { mode, meetingLink };
    return admin.save();
  },
  updateVerificationToken: async ({ email }, token, transaction) => {
    const foundUser = await adminService.findAdminByEmail(email);
    if (!foundUser) {
      const { code, name, message } = NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    foundUser.emailVerificationToken = token;
    await foundUser.save({ transaction });
  },
  /**
   * Sets default mode and meeting link.
   * @param {string} id, id of admin
   * @returns {Promise<Object|null>} A Promise resolving to the admin object if found, otherwise null.
   */
  removeDefaultMode: async ({ id }) => {
    const admin = adminService.findAdminByEmail(id);
    if (!admin) {
      const { code, message, name } = NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    admin.defaultMode = {};
    return admin.save();
  },
  verifyUser: async (token) => {
    const user = await Admin.findOne({
      where: { emailVerificationToken: token },
    });
    if (!user) {
      const { code, name, message } = NOT_FOUND;
      throw new ApiError(code, message, name);
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();
    return user;
  },
};

module.exports = adminService;
