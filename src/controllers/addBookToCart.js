const {
  ShoppingCart,
} = require("../db");

const addbookCart = async (req, res, next) => {
  // console.log("Funcnion getBooksCart");
  try {
    const { id_cart, id_book } = req.body;
    // console.log("id",id)
    const cart = await ShoppingCart.findByPk(id_cart, {
      attributes: ["cart_id","UserId"],
    });
    cart.addBook(id_book);
    res.send({
      message: "Se agrego libro al carrito",
      valor: true,
      id_book: id_book,
      cart: cart,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addbookCart;
