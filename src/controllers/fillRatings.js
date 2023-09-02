const {Book} = require("../db")


const fillRating = async ()=> {
    const books = await Book.findAll()
    for(const book of books){
        const target = await Book.findByPk(book.id_book)
        console.log(target.id_book,":",1 + Math.floor(Math.random() * 5));
        target.rating_ave = 1 + Math.floor(Math.random() * 5)
        await target.save()
    }
}

module.exports= fillRating