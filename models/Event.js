const { database } = require('../config/database');
const { INTEGER, STRING, BOOLEAN } = require('sequelize');

const Event = database.define('event', {
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
  duration: {
    type: STRING,
    allowNull: false,
  },
  startDate: {
    type: STRING,
    allowNull: false,
  },
  endDate: {
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
  meetingLink: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  isActive: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Event;
