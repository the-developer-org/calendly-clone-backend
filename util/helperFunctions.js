const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const moment = require('moment-timezone');
const { date } = require('joi');
// helper function to encode email,password
const generateToken = ({ email, password }) => {
  return jwt.sign({ email, password }, config.jwt_secret);
};

// helper function to decode the jwt token
const decodeToken = (token) => {
  const verifiedData = jwt.verify(
    token,
    config.jwt_secret,
    (error, decoded) => {
      if (error) {
        return null;
      } else {
        return decoded;
      }
    }
  );

  return verifiedData;
};

// helper function to generate hashpassword
const generateHashPassword = (password, salt) => {
  return bcrypt.hash(password, salt);
};

// helper function to verify  password
const checkPassword = async (password, encodedValue) => {
  return bcrypt.compare(password, encodedValue);
};

/**
 * Function to parse the time input
 * @param {*} timeStr
 * @returns
 */
const parseTimeInput = (timeStr) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeStr.split(':').map(Number);

  // Return a Date object with the time set
  return new Date(0, 0, 0, hours, minutes);
};

/**
 * Function to create slot
 * @param {*} startDate
 * @param {*} endDate
 * @param {*} startTime
 * @param {*} endTime
 * @param {*} slotDuration
 * @param {*} bufferTime
 * @returns {Object}
 */
const createSlots = (
  startDate,
  endDate,
  startTime,
  endTime,
  slotDuration,
  bufferTime
) => {
  const format = 'HH:mm';
  const ISTStartDate = moment.tz(startDate, 'Asia/Kolkata').startOf('day');
  const ISTEndDate = moment.tz(endDate, 'Asia/Kolkata').startOf('day');
  const startMoment = moment(startTime, format);
  const endMoment = moment(endTime, format);
  const bufferTimeMs = bufferTime * 60 * 1000;
  const slotDurationMs = slotDuration * 60 * 1000;

  if (endMoment.diff(startMoment) <= bufferTimeMs) {
    return null;
  }

  const slots = {};

  for (
    let currentDate = ISTStartDate.clone();
    currentDate.isSameOrBefore(ISTEndDate);
    currentDate.add(1, 'days')
  ) {
    let currentTime = currentDate.clone().set({
      hour: startMoment.hour(),
      minute: startMoment.minute(),
    });
    const currentDayKey = currentDate.format('l');
    slots[currentDayKey] = [];

    while (
      currentTime <
      currentDate.clone().set({
        hour: endMoment.hour(),
        minute: endMoment.minute(),
      })
    ) {
      const slotStartTime = currentTime.format(format);
      currentTime.add(slotDuration, 'minutes');

      if (
        currentTime
          .clone()
          .add(bufferTime, 'minutes')
          .isAfter(
            currentDate.clone().set({
              hour: endMoment.hour(),
              minute: endMoment.minute(),
            })
          )
      ) {
        break;
      }

      const slotEndTime = currentTime.format(format);

      slots[currentDayKey].push({
        date: currentDate.toDate(),
        startTime: slotStartTime,
        endTime: slotEndTime,
        duration: `${slotDuration} Minutes`,
        availability: true,
      });

      currentTime.add(bufferTime, 'minutes');
    }
  }
  console.log(slots);
  return slots;
};

const updateAvailability = (availableSlots, dateObject, startTime, endTime) => {
  const data = moment.tz(dateObject, 'Asia/Kolkata').startOf('day');
  const slots = availableSlots[data.format('l')];

  if (!slots) {
    return null;
  }

  slots.forEach((slot) => {
    if (slot.startTime === startTime && slot.availability) {
      slot.availability = false;
    }
  });

  return availableSlots;
};

module.exports = {
  generateHashPassword,
  generateToken,
  decodeToken,
  checkPassword,
  createSlots,
  updateAvailability,
};
