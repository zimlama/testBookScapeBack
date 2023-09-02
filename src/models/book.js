const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Book", {
    /// id seria el codigo ISBN del libro ///
    id_book: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isbn:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /// un libro puede tener mas de un autor, es un array de strings //
    // authors: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: false,
    // },
    // language: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    /// algunos libros tiene fecha exacta de publicacion, otros tiene solo año ///
    // como string ///
    /// se carga LA BDD de manera que figure solo el año como INTEGER ///
    published_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // publisher: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    /// algunos libros de la API no tienen descripción ///
    description: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    rating_ave: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // tags: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: true,
    // },
    page_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    url:{
      type: DataTypes.TEXT,
        allowNull: true,
      },
    /*active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },*/
  },{paranoid:true});
};

