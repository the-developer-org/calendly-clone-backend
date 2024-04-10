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
exports.DECODE_TOKEN_ERROR = {
  code: 500,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'Error while decoding token',
};

exports.GENERATE_HASH_ERROR = {
  code: 500,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'Error while generating hash password',
};

exports.SLOT_CREATION_ERROR = {
  code: 400,
  name: 'BAD_REQUEST',
  message: 'Error while creating the slots',
};

exports.EVENT_CREATION_ERROR = {
  code: 500,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'Error while creating the event',
};

exports.TOKEN_MISSING = {
  code: 401,
  name: 'UNAUTHORIZED',
  message: 'Token not found',
};

exports.USER_NOT_FOUND = {
  code: 404,
  name: 'NOTFOUND',
  message: 'User not found',
};

exports.SLOT_NOT_FOUND = {
  code: 404,
  name: 'NOTFOUND',
  message: 'Slot not found',
};

exports.EVENT_NOT_FOUND = {
  code: 404,
  name: 'NOTFOUND',
  message: 'Event not found',
};

exports.SLOT_BOOK_ERROR = {
  code: 500,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'Error while booking the slot',
};
