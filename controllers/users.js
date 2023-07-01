const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }));
};

const updateUser = (req, res) => {

};

const updateUserAvatar = (req, res) => {

};

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateUserAvatar,
};
