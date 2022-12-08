const db = require("../models")

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { ProductId, CartId, quantity } = req.body

      const findProductsCart = await db.CartItem.findOne({
        where: {
          ProductId: ProductId,
        },
      })
      if (findProductsCart) {
        return res.status(400).json({
          message: "Already Added in Cart !",
        })
      }

      const addProductCart = await db.CartItem.create({
        CartId: CartId,
        ProductId: ProductId,
        quantity: quantity,
      })

      const findAddProductCart = await db.CartItem.findByPk(addProductCart.id, {
        include: db.Cart,
      })

      return res.status(200).json({
        message: "Add Product to Cart !",
        data: findAddProductCart,
      })
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      })
    }
  },
  showCartItems: async (req, res) => {
    try {
      const showAllProductItems = await db.CartItem.findAll({
        include: [{ model: db.Cart }, { model: db.Product }],
      })

      return res.status(200).json({
        message: "Products in Cart!",
        data: showAllProductItems,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteProductCartById: async (req, res) => {
    try {
      const { id } = req.params

      await db.CartItem.destroy({
        where: {
          id: id,
        },
      })
      return res.status(200).json({
        message: "Product deleted from Cart !",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = cartController
