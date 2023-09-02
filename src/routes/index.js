const express = require('express');

const books = require('./books')
const users = require('./users')
const favorite= require('./favorite')
const review = require('./review')
const shoppingcart = require('./r.shoppingcart')

const router = express.Router();

router.use('/books', books);
router.use('/users', users);
router.use("/favorites", favorite);
router.use("/reviews", review);
router.use("/shoppingcart", shoppingcart);


module.exports = router;
