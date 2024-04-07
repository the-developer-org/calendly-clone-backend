const sendSuccessRes = (
  res,
  message = '',
  code = 200,
  name = '',
  data = {}
) => {
  const result = {
    message,
    data,
    status: name,
  };
  return res.status(code).json(result);
};

module.exports = sendSuccessRes;
