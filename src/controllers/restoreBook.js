const { Book } = require("../db");

const upDateBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, { paranoid: false });

    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.restore();

    return res.status(200).json({ message: "Book restored successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = upDateBook;
