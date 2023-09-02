const express = require("express");
const router = express.Router();
const allBooks = require("../controllers/allBooks"); //se hizo cambio por B mayuscula el archivo allBooks.js
const allTags = require("../controllers/allTags");
const filterBooks = require("../controllers/filterBooks");
const findById = require("../controllers/findById");
const allLanguage = require("../controllers/allLanguage");
const allAuthors = require("../controllers/allAuthors");
const upDateBook = require("../controllers/upDateBook");
const deleteBook = require("../controllers/deleteBook");
const restoreBook = require("../controllers/restoreBook");
const createBook = require("../controllers/createBook");
//const getAllRatingBook = require('../controllers/ratingBook');

/* GET books listing. */

router.get("/", allBooks);
router.get("/language", allLanguage);
router.get("/book/:id", findById);
router.get("/filter", filterBooks);
router.get("/tags", allTags);
router.get("/authors", allAuthors);
router.put("/update/:id", upDateBook);
router.delete("/delete/:id", deleteBook);
router.put("/restore/:id", restoreBook);
router.post("/", createBook);
//router.get("/ratings",getAllRatingBook)

module.exports = router;
