const {Book, Author, Publisher, Language,Tag} = require("../db")
const {Op} = require("sequelize")

//Los filtros conbinados llegan por query: se puede filtrar por:
//  *autor (author) - se pueden incluir mas de un valor separado por comas (,)
//  *publisher(publisher)
//  *precio(price) menores o ifguales al precio consignado
//  *rating promedio(rating_ave)mayor o igual al rating consignado
//  *tags(tags)  se pueden incluir mas de un valor separado por comas (,)
//Los filtros se pueden combinar de culquier forma y solo se incluyen los campos 
//por los cuales se quiere filtrar
//por ejemplo :
//http://localhost:3001/books/filter?language=en&price=10&publisher=Bloomsbury%20Publishing%20USA&tags=History,Fiction

const filrterBooks = async (req,res,next) =>{
    try{

        const{authors,language,publisher,price,rating_ave,tags}=req.query
        
        let arrayTags = []
        let arrayAuthor = []
        tags && (arrayTags = [...tags.split(",")])
        authors && (arrayAuthor = [...authors.split(",")])
        
        const whereClause = {};

        if (arrayAuthor && arrayAuthor.length > 0) {
            whereClause['$Authors.name$'] = { [Op.in]: arrayAuthor };
        }
        
        if (language) {
        whereClause['$Language.language$'] = { [Op.like]: `%${language}%` };
        }

        if (publisher) {
        whereClause['$Publisher.name$'] = { [Op.like]: `%${publisher}%` };
        }

        if (price) {
        whereClause.price = { [Op.lte]: parseFloat(price) };
        }

        if (rating_ave) {
        whereClause.rating_ave = { [Op.gte]: parseFloat(rating_ave) };
        }

        if (arrayTags && arrayTags.length > 0) {
            whereClause['$Tags.name$'] = { [Op.in]: arrayTags };
        }

        const filteredBooks = await Book.findAll({
            where: whereClause,
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
            ]
        });
        res.send(filteredBooks)
    }catch(error){
        next(error);
    }
}

module.exports=filrterBooks