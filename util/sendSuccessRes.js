const sendSuccessRes = (res, message, statusCode, data) => {
  const result = {
    message,
    data,
    status: 'Success',
  };
  res.status(statusCode).send(result);
};

module.exports = sendSuccessRes;

sendSuccessRes();
