const authService = require('../services/authService');
const ApiError = require('../util/ApiError');
const { DECODE_TOKEN_ERROR, TOKEN_MISSING } = require('../util/errorMessages');
const { decodeToken } = require('../util/helperFunctions');

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    const { code, message, name } = TOKEN_MISSING;
    throw new ApiError(code, message, name);
  }
  const decodedToken = decodeToken(req.headers.authorization);
  if (!decodedToken) {
    const { code, message, name } = DECODE_TOKEN_ERROR;
    throw new ApiError(code, message, name);
  }

  const admin = await authService.verifyAdmin(decodedToken);
  req.admin = admin;
  next();
};

module.exports = auth;
