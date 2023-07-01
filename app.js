const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '64a014e056f7959bb3df7235',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});