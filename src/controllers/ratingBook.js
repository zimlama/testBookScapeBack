// const {RatingAvgBook}=require("../models/ratingAvgBook")


// const { Tag } = require("../db");

// const getAllRatingBook = async (req, res, next) => {
  
//   try {
//     const ratings = await RatingAvgBook.findAll({
//         attributes: ['BookId', 'avg_rating'],
//         include: [
//           {
//             model: Book,
//             attributes: ['title']
//           }
//         ]
//       });
//     res.send(ratings);
//   } catch (error) {
//     next(error);
//   }
// };
// module.exports = getAllRatingBook;
