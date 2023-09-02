const { Book, Publisher, Author, Language, Tag } = require("../db");
const createBook = async (req, res, next) => {
  try {
    const {
      isbn,
      title,
      published_date,
      price,
      description,
      rating_ave,
      image,
      page_count,
      url,
      publisher,
      authors,
      language,
      tags,
    } = req.body;

    if (title.length === 0 || isbn.length === 0 || price.length === 0)
      return res.send("Title, genre and price are required");

    // Publisher
    let publisherBody = await Publisher.findOne({
      where: { name: publisher },
    });

    if (!publisherBody) {
      publisherBody = await Publisher.create({ name: publisher });
    }

    // Language
    let languageBody = await Language.findOne({
      where: { language },
    });

    if (!languageBody) {
      languageBody = await Language.create({ language });
    }

    // Authors
    const authorsBody = await Promise.all(
      authors.map(async (authorName) => {
        let author = await Author.findOne({
          where: { name: authorName },
        });

        if (!author) {
          author = await Author.create({ name: authorName });
        }

        return author;
      })
    );

    // Tags
    const tagsBody = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await Tag.findOne({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await Tag.create({ name: tagName });
        }

        return tag;
      })
    );

    // Create Book
    const newBook = await Book.create({
      isbn,
      title,
      published_date,
      price,
      description,
      rating_ave,
      image,
      page_count,
      url,
      PublisherId: publisherBody.id,
      LanguageId: languageBody.id,
    });

    await newBook.setAuthors(authorsBody);
    await newBook.setTags(tagsBody);

    res.send({
      message: "Book created successfully!",
      newBook,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createBook;
