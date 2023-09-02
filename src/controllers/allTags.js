const { Tag } = require("../db");

const allTags = async (req, res, next) => {
  // console.log("entre al controller allTags");
  try {
    const tags = await Tag.findAll({
      attributes: ["name", "id"],
    });
    res.send(tags);
  } catch (error) {
    next(error);
  }
};
module.exports = allTags;
