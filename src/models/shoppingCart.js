const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ShoppingCart", {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
