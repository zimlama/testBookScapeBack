const {
    Book,
  } = require("../db");

const deleteBook = async (req, res, next) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (book) {
        await book.destroy();
        res.status(204).json({message: 'Deleted successfuly' , success: true});
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  module.exports=deleteBook;