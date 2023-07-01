const Card = require('../models/card');
const { ERROR_CODE } = require('../utils/const');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {});
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
      }
    })
    .catch((err) => {});
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Передан несуществующий id карточки' });
      }
    })
    .catch((err) => {});
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Передан несуществующий id карточки' });
      }
    })
    .catch((err) => {});
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
