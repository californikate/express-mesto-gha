const User = require('../models/user');
const { ERROR_CODE } = require('../utils/const');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateUserAvatar,
};
