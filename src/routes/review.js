const express = require('express');
const router = express.Router();

const createReview = require('../controllers/createReview');
const userReviews = require('../controllers/getUserReviews');
const bookReviews = require('../controllers/getBookreviews');

router.post('/create', createReview);
router.get('/user/:id', userReviews);
router.get('/book/:id', bookReviews);

module.exports = router;