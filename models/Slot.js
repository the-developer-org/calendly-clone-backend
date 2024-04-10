const { database } = require('../config/database');
const { STRING, INTEGER, TIME, DATE } = require('sequelize');

const Slot = database.define('slot', {
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  eventDate: {
    type: DATE,
    allowNull: false,
  },
  eventStartTime: {
    type: TIME,
    allowNull: false,
  },
  eventEndTime: {
    type: TIME,
    allowNull: false,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = Slot;
