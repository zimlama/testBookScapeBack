require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, RW_URLdb, RW_USERdb, RW_PORTdb } =
  process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bookscape`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// ); 

// Conectar con la DB remota (Railway)
 const sequelize = new Sequelize(
   `postgresql://postgres:${RW_USERdb}@${RW_URLdb}:${RW_PORTdb}/railway`,
   {
     logging: false, // set to console.log to see the raw SQL queries
     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models);
const {
  Book,
  Review,
  User,
  Pay,
  Favorite,
  ShoppingCart,
  Order,
  Detail,
  Language,
  Publisher,
  Tag,
  Author,
  //Rating_avg_book,
} = sequelize.models;
//!Revisar todas las relaciones hasMany y pasar a belongto()
// Aca vendrian las relaciones
//(https://www.youtube.com/watch?v=wgLo_0FL0yc
//https://www.youtube.com/watch?v=ocysQ07G4PQ)
//User.hasOne(Address,foreignKey:'UserId'}) añana UserId a la tabla Addresses
//Address.belongsTo(User, {foreignKey:'UserId'}) añana UserId a la tabla Addresses
// luego de una relacion hasOne o HasMay, se genera la relacion BelongsTo
// User.hasMany(Post, {foreignKey:'UserId'}) añade una UserId a la tabla Post
// Post.belongsTo(User, {foreignKey:'UserId'}) // añande una UserId  a la tabla Post

//Relaciones de Book
Publisher.hasMany(Book, { foreignKey: "PublisherId" }); //añade una foringKey PublisherId a Book
Book.belongsTo(Publisher, { foreignKey: "PublisherId" }); //añade una foringKey PublisherId a Book

Language.hasMany(Book, { foreignKey: "LanguageId" }); //añade una foringKey LanguageId a Book
Book.belongsTo(Language, { foreignKey: "LanguageId" }); //añade una foringKey LanguageId a Book

Book.hasMany(Review, { foreignKey: "BookId" }); //añade una foringKey BookId a Review
Review.belongsTo(Book, { foreignKey: "BookId" }); //añade una foringKey BookId a Review

Book.hasMany(Favorite, { foreignKey: "BookId" }); //añade una foringKey BookId a Favorite
Favorite.belongsTo(Book, { foreignKey: "BookId" }); //añade una foringKey BookId a Favorite

// Realciones Many to Many de Book
Book.belongsToMany(Author, { through: "author_book" }); //Crea tabla intermedia
Author.belongsToMany(Book, { through: "author_book" }); //Crea tabla intermedia

Book.belongsToMany(Tag, { through: "tag_book" }); //Crea tabla intermedia
Tag.belongsToMany(Book, { through: "tag_book" }); //Crea tabla intermedia

Book.belongsToMany(ShoppingCart, { through: "shopping_book" }); //Crea tabla intermedia
ShoppingCart.belongsToMany(Book, { through: "shopping_book" }); //Crea tabla intermedia

//Realaciones de User
User.hasMany(Review, { foreignKey: "UserId" }); //añade una foringKey UserId a Review
Review.belongsTo(User, { foreignKey: "UserId" }); //añade una foringKey UserId a Review
// de esta manera cada favorito, tendra un libro y es un solo User de ese favorito
User.hasMany(Favorite, { foreignKey: "UserId" }); //añade una foringKey UserId a Favorite
Favorite.belongsTo(User, { foreignKey: "UserId" }); //añade una foringKey UserId a Favorite

User.hasMany(Order, { foreignKey: "UserId" }); //añade una foringKey UserId a Order
Order.belongsTo(User, { foreignKey: "UserId" }); //añade una foringKey UserId a Order

User.hasMany(Pay, { foreignKey: "UserId" }); //añade una foringKey UserId a Pay
Pay.belongsTo(User, { foreignKey: "UserId" }); //añade una foringKey UserId a Pay

User.hasOne(ShoppingCart, { foreignKey: "UserId" }); //añade un foringKey UserId a ShoppingCart
ShoppingCart.belongsTo(User, { foreignKey: "UserId" }); //añade un foringKey UserId a ShoppingCart

//Relaciones de Order
Order.hasMany(Detail, { foreignKey: "OrderId" }); //añade una foringKey Order a Detail
Detail.belongsTo(Order, { foreignKey: "UserId" }); //añade una foringKey Order a Detail

Pay.hasOne(Order, { foreignKey: "PayId" }); //añade un foringKey PayId a Order
Order.belongsTo(Pay, { foreignKey: "PayId" }); //añade un foringKey PayId a Order

// //Language.hasMany(Book); //agrega el id Language a book
// //Book.hasOne(Language) //llave foranea definida en Language
// Book.belongsTo(Language,{foreignKey:'PLanguageId'}) //Crea una forinKey en Book

// //revisar relacion cueando se codee el controllador de filtros
// // de ser necesario crear la relacion Book.belongsTo(Publisher,{foreignKey:'PublisherId'})
// //Publisher.hasMany(Book); //agrega el id Publisher a book
// Book.belongsTo(Publisher,{foreignKey:'PPublisherId'}) //agrega el id Publisher a book

// //Book.hasMany(Favorite); //agrega el id Book a Favorite
// //Book.belongsTo(Favorite,{foreignKey:'PBookId'}) //agrega el id Book a Favorite
// Favorite.belongsTo(Book,{foreignKey:'PBookId'}) //agrega el id Book a Favorite
// //Favorite.hasOne(Book); // llave foranea definida en book

// //User.hasMany(Favorite); //agrega el id User a Favorite
// //User.belongsTo(Favorite,{foreignKey:'UserId'}); //agrega el id User a Favorite
// //Revisando donde se crea la foringKey
// Favorite.belongsTo(User,{foreignKey:'PUserId'}); //agrega el id User a Favorite

// //Book.hasMany(Review);
// //Review.hasOne(Book);
// //Book.belongsTo(Review,{foreignKey:'PBookId'}); // agrega el id Book a Review
// Review.belongsTo(Book,{foreignKey:'PBookId'}); // agrega el id Book a Review

// Book.belongsToMany(Author, { through: "author_book" }); //Crea tabla intermedia
// Author.belongsToMany(Book, { through: "author_book"}); //Crea tabla intermedia

// Book.belongsToMany(Tag, { through: "tag_book" }); //Crea tabla intermedia
// Tag.belongsToMany(Book, { through: "tag_book"}); //Crea tabla intermedia

// Book.belongsToMany(ShoppingCart, { through: "shopping_book" }); //Crea tabla intermedia
// ShoppingCart.belongsToMany(Book, { through: "shopping_book"}); //Crea tabla intermedia

// //User.hasMany(Pay);
// //Pay.hasOne(User);
// User.belongsTo(Pay,{foreignKey:'PUserId'});

// //User.hasMany(Order);
// //Order.hasOne(User);
// User.belongsTo(Order,{foreignKey:'PUserId'});

// //Order.hasMany(Detail);
// //Detail.hasOne(Order);
// Order.belongsTo(Detail,{foreignKey:'POrderId'});

// //Order.hasOne(Pay);
// //Pay.hasOne(Order);
// Order.belongsTo(Pay,{foreignKey:'POrderId'});
// Pay.belongsTo(Order,{foreignKey:'PPayId'});

// //User.hasOne(ShoppingCart);
// ShoppingCart.belongsTo(User,{foreignKey:'PShoppingCartId'});

// //User.hasMany(Review);
// //Review.hasOne(User)
// User.belongsTo(Review,{foreignKey:'PReviewId'});
// /////////////////////////////////////////////////////////////////////
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
