const { database } = require('../config/database');
const { INTEGER, STRING, JSONB, BOOLEAN } = require('sequelize');

const Admin = database.define('admin', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  defaultMode: {
    type: JSONB,
    allowNull: true,
  },
  isEmailVerified: {
    type: BOOLEAN,
    default: false,
  },
  emailVerificationToken: {
    type: STRING,
  },
});

module.exports = Admin;
