const Admin = require('../models/Admin');

const adminService = {
  findAdminByEmail: async (email) => {
    return await Admin.findOne({ where: { email } });
  },
};

module.exports = adminService;
