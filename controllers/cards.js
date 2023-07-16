const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => next(new NotFoundError('Карточка с указанным id не найдена')))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId);
      } else {
        next(new ForbiddenError('Невозможно удалить карточку другого пользователя'));
      }
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Карточка с указанным id не найдена'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки'));
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => next(new NotFoundError('Карточка с указанным id не найдена')))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Передан несуществующий id карточки'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => next(new NotFoundError('Карточка с указанным id не найдена')))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Передан несуществующий id карточки'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
