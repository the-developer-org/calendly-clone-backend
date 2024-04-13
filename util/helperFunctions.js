const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

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
  const startDateTime = parseTimeInput(startTime).getTime();
  const endDateTime = parseTimeInput(endTime).getTime();
  const bufferTimeMs = bufferTime * 60 * 1000;

  if (endDateTime - startDateTime <= bufferTimeMs) {
    return null;
  }

  const slots = {};
  const totalDurationMs = endDateTime - startDateTime - bufferTimeMs;
  const totalDurationMinutes = totalDurationMs / (1000 * 60);
  const slotsPerDay = Math.floor(totalDurationMinutes / slotDuration);

  if (slotsPerDay <= 0) {
    return null;
  }

  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    let currentTime = parseTimeInput(startTime);
    slots[currentDate.toDateString()] = [];
    for (let i = 0; i < slotsPerDay; i++) {
      const slotStartTime = currentTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);

      if (currentTime.getTime() + bufferTimeMs > endDateTime) {
        break;
      }

      const slotEndTime = currentTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });

      slots[currentDate.toDateString()].push({
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        startTime: slotStartTime,
        endTime: slotEndTime,
        duration: `${slotDuration} Minutes`,
        availability: true,
      });

      currentTime.setMinutes(currentTime.getMinutes() + bufferTime);
    }
  }
  return slots;
};

const updateAvailability = (availableSlots, dateObject, startTime, endTime) => {
  const slots = availableSlots[dateObject.toDateString()];

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
