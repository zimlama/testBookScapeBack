
  const express = require("express");
  const getBooksCart = require("../controllers/getBooksCart"); 
  const addbookCart = require("../controllers/addBookToCart"); 
  const removebookCart = require("../controllers/removeBookFromCart"); 
  
  const router = express.Router();

  /* GET books listing. */
  
  router.get("/books/:id", getBooksCart);
  router.put("/add", addbookCart);
  router.delete("/remove", removebookCart);
  
  module.exports = router;
  