//DETAIL un detalle tiene un solo book y book beongs to detail
const {
    ShoppingCart,
  } = require("../db");
  
  const removebookCart = async (req, res, next) => {
    // console.log("Funcnion getBooksCart");
    try {
      const { id_cart, id_book } = req.body;
      // console.log("id",id)
      const cart = await ShoppingCart.findByPk(id_cart, {
        attributes: ["cart_id","UserId"],
      });
      cart.removeBook(id_book);
      res.send({
        message: "Se elimino el libro del carrito",
        valor: true,
        id_book: id_book,
        cart: cart,
      });
    } catch (error) {
      next(error);
    }
  };
  module.exports = removebookCart;
  