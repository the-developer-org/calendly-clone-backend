const { database } = require('../config/database');
const { INTEGER, STRING, BOOLEAN, TIME, DATE, JSONB } = require('sequelize');

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
    type: INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DATE,
    allowNull: false,
  },
  endDate: {
    type: DATE,
    allowNull: false,
  },
  startTime: {
    type: TIME,
    allowNull: false,
  },
  endTime: {
    type: TIME,
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
  availableSlots: {
    type: JSONB,
    allowNull: false,
  },
  bufferTime: {
    type: INTEGER,
    allowNull: false,
  },
  mode: {
    type: STRING,
    allowNull: false,
  },
  color: {
    type: STRING,
  },
});

module.exports = Event;
