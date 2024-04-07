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

// exporting
module.exports = {
  generateToken,
  decodeToken,
  checkPassword,
  generateHashPassword,
};
