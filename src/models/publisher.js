const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Publisher", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {paranoid: true})
  ;
};
