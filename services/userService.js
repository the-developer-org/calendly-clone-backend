const User = require('../models/User');

const userService = {
  createUser: async (body, transaction = null) => {
    const options = transaction ? { transaction } : {};
    return User.create({ name: body.userName, email: body.userEmail }, options);
  },
};

module.exports = userService;
