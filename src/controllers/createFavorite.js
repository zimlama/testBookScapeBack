const { Favorite , Book, User } = require("../db");

const createFavorite= async (req,res,next)=>{
    try{
        const { userId, bookId } = req.body;
            if(userId && bookId){
                const book = await Book.findByPk(Number(bookId))
                const user = await User.findByPk(userId)
                if(book && user ){
                    const favorite = await Favorite.create(
                        {
                            BookId: Number(bookId),
                            UserId: userId,
                        }
                    );
                }else{
                   return res.status(400).json({message:"Usuario o Libro inexistente"});
                }
                return res.status(201).json({message:"Favorito agregado"});
            }else{
                return res.status(400).json({message:"Falta userId o bookId"});
            }
    }catch(error){
        next(error);
    }
};

module.exports = createFavorite;