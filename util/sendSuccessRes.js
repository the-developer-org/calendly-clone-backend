const sendSuccessRes = (
  res,
  message = '',
  code = 200,
  name = '',
  data = {}
) => {
  return res.status(code).json({
    message,
    data,
    status: name,
  });
};

module.exports = sendSuccessRes;
