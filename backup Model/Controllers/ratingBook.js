const {RatingAvgBook , Book} = require("../db")

const allRatings = async (req, res, next) => {
    try{
        const ratings = await RatingAvgBook.findAll({
            attributes: ['BookId', 'avg_rating'],
            include: [
              {
                model: Book,
                attributes: ['title']
              }
            ]
          })
          return res.status(201).json(ratings);
    }catch(err){
        next(err);
    }
}

module.exports = allRatings;