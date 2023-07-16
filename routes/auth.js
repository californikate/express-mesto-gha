const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { LINK_REGEX } = require('../utils/const');
const { postUser, login } = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().optional().min(2).max(30),
      about: Joi.string().optional().min(2).max(30),
      avatar: Joi.string().optional().regex(LINK_REGEX),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  postUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = router;
