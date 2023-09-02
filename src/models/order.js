const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_order: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      purchase_status: {
        type: DataTypes.ENUM("Pending", "Completed"),
        allowNull: false,
        defaultValue: "Pending",
      },
      // active: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: true,
      // },
    },
    {paranoid: true }
  );
};
