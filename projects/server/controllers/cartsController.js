const db = require("../models")

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { product_id, quantity, price } = req.body

      const findProductCart1 = await db.CartItem.findOne({
        where: {
          product_id: product_id,
          quantity: quantity,
          price: price,
        },
        include: [{ model: db.Cart }, { model: db.Product }],
      })

      if (findProductCart1) {
        return res.status(400).json({
          message: "You alr add this product !",
        })
      }

      const addProduct = await db.Cart.create({
        user_id: req.user.id,
        product_id: product_id,
      })

      const findProductCart2 = await db.CartItem.findByPk(addProduct.id, {
        include: db.Cart,
      })

      return res.status(201).json({
        message: "Product Added to Cart",
        data: findProductCart2,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }

    //   try {
    //     const { product_id, quantity, price } = req.body
    //     const total_price = quantity * price

    //     const findProductCart1 = await db.CartItem.findOne({
    //       where: {
    //         product_id,
    //       },
    //       include: [{ model: db.Cart }, { model: db.Product }],
    //     })
    //     if (findProductCart1) {
    //       await CartItem.update({
    //         quantity,
    //         total_price,
    //       }),
    //         {
    //           where: {
    //             id: findProductCart1.id,
    //           },
    //         }
    //     }
    //     if (!findProductCart1) {
    //       product_id, quantity, price, total_price
    //     }
    //     const findProductCart2 = await db.CartItem.findOne({
    //       where: {
    //         product_id,
    //       },
    //       include: [{ model: db.Cart }, { model: db.Product }],
    //     })

    //     return res.status(200).json({
    //       message: "Add to cart was succesfull",
    //       data: findProductCart2,
    //     })
    //   } catch (err) {
    //     console.log(err)
    //     return res.status(500).json({
    //       message: err.message,
    //     })
    //   }
  },
  showCartItems: async (req, res) => {
    try {
      const showAllProductItems = await db.CartItem.findAll({
        include: [{ model: db.Cart }],
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
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params

      await CartItem.destroy({
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
