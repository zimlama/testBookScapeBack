const { Book, Publisher , Author , Language, Tag } = require("../db");
const { Op } = require("sequelize");

const allBooks = async (req, res, next) => {
  try {
    const { target } = req.query;

    if (!target) {
      const allBooksDB = await Book.findAll({
        attributes: [
          "id_book",
          "isbn",
          "title",
          "published_date",
          "price",
          "description",
          "rating_ave",
          "image",
          "page_count",
          "url",
        ],
        include: [
          {
            model: Author,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Publisher,
            attributes: ["name"],
          },
          {
            model: Language,
            attributes: ["language"],
          },
          {
            model: Tag,
            attributes: ["name"],
            through: {
                attributes: [],
            },
          },
      ],
      });
      return res.send(allBooksDB);
    }

    const titletBooks = await Book.findAll({
      where: {
        title: { [Op.iLike]: `%${target}%` },
      },
      attributes: [
        "id_book",
        "isbn",
        "title",
        "published_date",
        "price",
        "description",
        "rating_ave",
        "image",
        "page_count",
        "url",
      ],
      include:[
        {
          model: Author,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Publisher,
          attributes: ["name"],
        },
        {
          model: Language,
          attributes: ["language"],
        },
        {
          model: Tag,
          attributes: ["name"],
          through: {
              attributes: [],
          },
        },
    ],
    });
    const authorBooks = await Book.findAll({
      attributes: [
        "id_book",
        "isbn",
        "title",
        "published_date",
        "price",
        "description",
        "rating_ave",
        "image",
        "page_count",
        "url",
      ],
      include: [
        {
          model: Author,
          where: {
            name: { [Op.iLike]: `%${target}%` },
          },
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Publisher,
          attributes: ["name"],
        },
        {
          model: Language,
          attributes: ["language"],
        },
        {
          model: Tag,
          attributes: ["name"],
          through: {
              attributes: [],
          },
        },
    ],
    });
    const publisherBooks = await Book.findAll({
      attributes: [
        "id_book",
        "isbn",
        "title",
        "published_date",
        "price",
        "description",
        "rating_ave",
        "image",
        "page_count",
        "url",
      ],
      include:[
        {
          model: Author,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Publisher,
          where: {
            name: { [Op.iLike]: `%${target}%` },
          },
          attributes: ["name"],
        },
        {
          model: Language,
          attributes: ["language"],
        },
        {
          model: Tag,
          attributes: ["name"],
          through: {
              attributes: [],
          },
        },
      ],
    });
    const targetBooks = [...titletBooks, ...authorBooks, ...publisherBooks];
    if (targetBooks.length === 0)
      return res.status(404).json({ error: "Not Found" });
    res.send(targetBooks);
  } catch (error) {
    next(error);
  }
};

module.exports = allBooks;
