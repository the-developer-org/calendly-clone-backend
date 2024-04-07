const { INTERNAL_SERVER_ERROR } = require('./errorMessages');

class ApiError extends Error {
  constructor(
    statusCode = INTERNAL_SERVER_ERROR.code,
    message = INTERNAL_SERVER_ERROR.message,
    codeName = INTERNAL_SERVER_ERROR.name,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = codeName;
    this.stack = stack || Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
