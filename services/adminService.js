const Admin = require('../models/Admin');

const adminService = {
  // function to find admin by email
  findAdminByEmail: async (email) => {
    try {
      const adminDetails = await Admin.findOne({ where: { email } });
      return adminDetails;
    } catch (error) {
      throw error;
    }
  },

  // function to create a new admin
  createAdmin: async (name, email, password) => {
    try {
      const createdAdmin = await Admin.create({ name, email, password });
      return createdAdmin;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = adminService;
