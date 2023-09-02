const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Detail", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    book: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
