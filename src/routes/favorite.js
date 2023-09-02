const express = require('express');
const router = express.Router();

const createFavorite = require('../controllers/createFavorite');
const deleteFavorite = require('../controllers/deleteFavorite');

router.post('/create', createFavorite);
router.delete('/delete', deleteFavorite);

module.exports = router;