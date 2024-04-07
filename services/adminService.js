const Admin = require('../models/Admin');

const adminService = {
  /**
   * Finds an admin by email.
   * @param {string} email - The email of the admin to find.
   * @returns {Promise<Object|null>} A Promise resolving to the admin object if found, otherwise null.
   */
  findAdminByEmail: async (email) => {
    return await Admin.findOne({ where: { email } });
  },
};

module.exports = adminService;
