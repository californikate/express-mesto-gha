const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('*', (res, req, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
