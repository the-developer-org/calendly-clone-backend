const { database } = require('../config/database');
const { STRING, INTEGER } = require('sequelize');

const User = database.define('user', {
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = User;
