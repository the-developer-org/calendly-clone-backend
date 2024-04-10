const { database } = require('../config/database');
const { STRING, INTEGER } = require('sequelize');

const Slot = database.define('slot', {
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: STRING,
    allowNull: false,
  },
  startTime: {
    type: STRING,
    allowNull: false,
  },
  endTime: {
    type: STRING,
    allowNull: false,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = Slot;
