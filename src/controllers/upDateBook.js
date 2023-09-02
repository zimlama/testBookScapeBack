const {
    Book,
  } = require("../db");

const upDateBook = async (req, res, next) => {
    try {
      const { LanguageId, PublisherId, authorIds, tagIds, ...otherFields} = req.body;
      const book = await Book.findByPk(req.params.id);
      console.log("body: ",req.body);
      if (book) {
        await book.update(otherFields);
        // Actualizar las claves extranjeras
      if (LanguageId) {
        await book.setLanguage(LanguageId);
      }
  
      if (PublisherId) {
        await book.setPublisher(PublisherId);
      }
  
      if (authorIds) {
        await book.setAuthors(authorIds);
      }
  
      if (tagIds) {
        await book.setTags(tagIds);
      }

        res.status(200).json({ message: 'Book updated successfully' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      next(error);
    }
  };
  
module.exports=upDateBook;