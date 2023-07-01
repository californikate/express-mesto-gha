const User = require('../models/user');
const { ERROR_CODE } = require('../utils/const');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {});
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {});
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {});
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => ({ data: user }))
    .catch((err) => {});
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateUserAvatar,
};
