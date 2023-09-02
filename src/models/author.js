const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Author", {
    /// id seria el codigo ISBN del libro ///
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{paranoid:true});
};
