const { Review , Book, User } = require("../db");

const createReview = async (req,res,next)=>{
    try{
        const { userId, bookId, review_text, rating } = req.body;
            if(userId && bookId && review_text && rating){
                const  book = await Book.findByPk(Number(bookId))
                const  user = await User.findByPk(userId)
                if(book && user ){
                    const review = await Review.create(
                        {
                            review_text: review_text,
                            rating: rating,
                            BookId: Number(bookId),
                            UserId: userId,
                        }
                    );
                }else{
                   return res.status(400).json({message:"Usuario o Libro inexistente"});
                }
                return res.status(201).json({message:"review agregada"});
            }else{
                return res.status(400).json({message:"Falta userId o bookId"});
            }
    }catch(error){
        next(error);
    }
};

module.exports = createReview;