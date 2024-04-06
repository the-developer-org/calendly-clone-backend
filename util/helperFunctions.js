const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// helper function to encode email,password
const generateToken = (email, password) => {
  return jwt.sign({ email, password }, process.env.JWT_SECRET_DEV);
};

// helper function to decode the jwt token
const decodeToken = (token) => {
  const verifiedData = jwt.verify(
    token,
    process.env.JWT_SECRET_DEV,
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
const generateHashPassword = async (password, salt) => {
  const hashPassword = await bcrypt.hash(, salt);
  return hashPassword;
};

// helper function to verify  password
const checkPassword = async (password, encodedValue) => {
  const result = await bcrypt.compare(password, encodedValue);
  return result;
};

// exporting
module.exports = {
  generateToken,
  decodeToken,
  checkPassword,
  generateHashPassword,
};
