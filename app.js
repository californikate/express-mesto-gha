const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const otherRouter = require('./routes/index');
const authMiddle = require('./middlewares/auth');
const errorsMiddle = require('./middlewares/errors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_URL);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);

app.use(authMiddle);
app.use(usersRouter);
app.use(cardsRouter);
app.use(otherRouter);

app.use(errors());
app.use(errorsMiddle);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
