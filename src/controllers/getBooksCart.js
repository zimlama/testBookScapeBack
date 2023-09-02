// Agregar
//     {
//         id: shopingCart
//         id: libro
//     }
//     {
//         menssaje. "se agregado"
//         valor: true;
//     }
// Eliminar
// {
//     id: shopingCart
//     id: libro
//     {
//         menssaje. "se eliminado"
//         valor: false;
//     }
// }

//DETAIL un detalle tiene un solo book y book beongs to detail
// Martín cuando puedas me gustaría ver lo de pasar
// el shoping cart a la base de datos, solo necesitaría
// saber que estructura de datos me enviarías por body.
// Entiendo que es ID de usuario IDs de books nada más, y
// con eso estaríamos. Devolvería un objeto con un
// message: ShopingCart creado y otra propiedad ID del shopingCart.
// Los demás controllers de shoppingCart vendrían después,
// agregar, eliminar, si fuese necesario algún otro también.
// Si necesitas algún controlador para pasar esos datos avísanos.
// Voy trabajando en esta estructura que te pase.

//Crear {
//     ID usuario, Id Libros
// }

// Checkbox si se quiere comprar.

//getBooksCart{
//     ID CARRITO

//         BOOKS [
//             {

//             }
//         ] datos libros
//             titlo
//             imagen
//             autor
//             precio

const {
  Book,
  Language,
  Author,
  Publisher,
  Review,
  Tag,
  ShoppingCart,
} = require("../db");

const getBooksCart = async (req, res, next) => {
  // console.log("Funcnion getBooksCart");
  try {
    const { id } = req.params;
    // console.log("id",id)
    const shoppingCart = await ShoppingCart.findByPk(id, {
      attributes: ["createdAt", "updatedAt", "UserId"],
      include: [
        {
          model: Book,
          attributes: [
            "id_book",
            "title",
            "published_date",
            "price",
            "description",
            "rating_ave",
            "image",
          ],
          include: [
            {
              model: Tag,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Author,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Language,
              attributes: ["language"],
            },
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.send(shoppingCart);
  } catch (error) {
    next(error);
  }
};
module.exports = getBooksCart;

