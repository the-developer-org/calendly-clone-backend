exports.EMAIL_ALREADY_IN_USE = {
  code: 409,
  name: 'CONFLICT',
  message: 'Email is already in use',
};
exports.NOT_FOUND = {
  code: 404,
  name: 'NOTFOUND',
  message: 'Data not found',
};
exports.USER_NOT_FOUND = {
  code: 404,
  name: 'NOTFOUND',
  message: 'User not found',
};
exports.PASSWORD_MISSMATCH = {
  code: 401,
  name: 'UNAUTHORIZED',
  message: 'Incorrect Password',
};
exports.EMAIL_NOT_VERIFIED = {
  code: 403,
  name: 'FORBIDDEN',
  message: 'Email is not verified',
};
exports.BAD_REQUEST = {
  code: 400,
  name: 'BAD_REQUEST',
  message: 'Invalid details',
};

exports.INTERNAL_SERVER_ERROR = {
  code: 500,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'Internal server error',
};

exports.GENERATE_TOKEN_ERROR = {
  code: 500,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'Error while generating token',
};

exports.GENERATE_HASH_ERROR = {
  code: 500,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'Error while generating hash password',
};
