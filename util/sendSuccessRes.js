const sendSuccessRes = (res, message, statusCode = 200, data) => {
  const result = {
    message,
    data,
    status: 'Success',
  };
  return res.status(statusCode).send(result);
};

module.exports = sendSuccessRes;
