const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1, // Establecer el valor mínimo para 'rating'
        max: 5, // Establecer el valor máximo para 'rating'
      },
      allowNull: false,
    },
   /*active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },*/
  },{paranoid:true});
};
