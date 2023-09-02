const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("rating_avg_book", {
    BookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    avg_rating: DataTypes.FLOAT,
  });
};
