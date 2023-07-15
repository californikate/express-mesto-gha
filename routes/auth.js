const router = require('express').Router();

const {
  login,
  postUser,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', postUser);

module.exports = router;
