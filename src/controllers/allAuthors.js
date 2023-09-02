const { Author } = require("../db");

const allAuthors = async (req, res, next) => {
  // console.log("entre al controller allTags");
  try {
    const author = await Author.findAll({
      attributes: ["name", "id"],
    });
    res.send(author);
  } catch (error) {
    next(error);
  }
};
module.exports = allAuthors;
