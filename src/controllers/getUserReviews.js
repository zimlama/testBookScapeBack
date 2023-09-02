const { Op } = require("sequelize");

const {
  Book,
  Language,
  Author,
  Publisher,
  Review,
  Tag,
  User,
} = require("../db");

const userReviews = async (req, res, next) => {
  //console.log("Funcnion userReviews");
  const { id } = req.params;
  //console.log("id", id);
  //console.log(await User.findByPk(id));
  try {
    if (await User.findByPk(id)) {
      //console.log("Entre a bucar las reviews de: ", id);
      const reviews = await Review.findAll({
        attributes: ["review_id", "review_text", "rating", "createdAt"],
        include: [
          {
            model: Book,
            attributes: ["id_book", "title"],
          },
        ],
        where: {
          UserId: id,
        },
      });
      if (reviews.length > 0) {
        return res.status(201).json({
          message: "reviews encontradas",
          reviews: reviews,
        });
      } else {
        return res.status(201).json({
          message: "no se encontraron reviews",
        });
      }
    } else {
      return res.status(400).json({ message: "Usuario inexistente" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = userReviews;
