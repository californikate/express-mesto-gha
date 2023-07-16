const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const { LINK_REGEX } = require('../utils/const');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(LINK_REGEX),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
