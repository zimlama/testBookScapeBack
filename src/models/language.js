const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Language", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {paranoid: true})
};
