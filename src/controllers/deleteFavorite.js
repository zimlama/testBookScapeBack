const {Favorite} = require("../db")

const deleteFavorite=async (req,res,next)=>{
    try{
        const {id} = req.body

        console.log(parseInt(id));

        if( !id || isNaN(Number(id)) )return res.status(400).json({message:"Se necesita un Id valido"}) 
        const fav = await Favorite.findByPk(Number(id),{ paranoid: true })
        if(!fav) return res.status(404).json({message:"No se encuentra el Id"})
        
        await Favorite.destroy({
                    where: {
                        favorites_id:Number(id)
                    }
                  });
        return res.send({message:"Favorito Eliminado"})
            
    }catch(error){
        next(error)
    }

}

module.exports=deleteFavorite