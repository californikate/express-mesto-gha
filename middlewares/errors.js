const { ERROR_CODE } = require('../utils/const');

const errors = (err, req, res, next) => {
  const { status = ERROR_CODE.SERVER_ERROR, message } = err;

  res.status(status).send({
    message: status === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
};

module.exports = errors;
