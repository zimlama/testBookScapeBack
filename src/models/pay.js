const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /* 
Este modelo debe definirse dacuerdo a los datos de 
la respuesta del medio de pago https://www.mercadopago.com.ar/developers/es/docs/checkout-api/landing
*/

  sequelize.define(
    "Pay",
    {
      id_pay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_date: {
        type: DataTypes.DATE,
      },
      total_order: {
        type: DataTypes.DECIMAL(10, 2),
      },
      payment_status: {
        type: DataTypes.ENUM("Pending", "Completed"),
      },
      date_approved: {
        type: DataTypes.DATE,
      },
/*
      id_payment: {},

      authorization_code: {},

      mp_id_order: {},

      fee_mp: {},

      active: {},
*/
    },
   
  );
};
