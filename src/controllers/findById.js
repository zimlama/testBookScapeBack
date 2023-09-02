const { Book, Language, Author, Publisher, Review, Tag } = require("../db");

const findById = async (req, res, next) => {
  // console.log("Funcnion findById");
  try {
    const { id } = req.params;
    // console.log("id",id)
    const book = await Book.findByPk(id, {
      attributes: [
        "id_book",
        "title",
        "published_date",
        "price",
        "description",
        "rating_ave",
        "image",
      ],
      include: [
        {
          model: Publisher,
          attributes: ["name","id"],
        },
        {
          model: Tag,
          attributes: ["name","id"],
          through: {
            attributes: [],
          },
        },
        {
          model: Author,
          attributes: ["name","id"],
          through: {
            attributes: [],
          },
        },
        {
          model: Language,
          attributes: ["language","id"],
        },
      ],
    });
    if (!book) {
      return res.status(404).json({ message: "Not found!", book: book });
    }
    return res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
module.exports = findById;
