const Admin = require('../models/Admin');

const adminService = {
  // function to find admin by email
  findAdminByEmail: async (email) => {
    const adminDetails = await Admin.findOne({ where: { email } });
    return adminDetails;
  },

  // function to create a new admin
  createAdmin: async (name, email, password) => {
    const createdAdmin = await Admin.create({ name, email, password });
    return createdAdmin;
  },
};

module.exports = adminService;
