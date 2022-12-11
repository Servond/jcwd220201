const db = require("../models")

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { ProductId, quantity } = req.body

      const findProductsCart = await db.Cart.findOne({
        where: {
          ProductId: ProductId,
        },
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })
      // if (findProductsCart) {
      //   return res.status(400).json({
      //     message: "Product Already Added in Cart !",
      //   })
      // }
      // const findProductStockId = await db.Product.findByPk(ProductId, {
      //   include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
      // })

      // const stock = findProductStockId.ProductStock.map((val) => val.stock)
      // let subtotal = 0

      // for (let i = 0; i < stock.length; i++) {
      //   subtotal += Number(stock[i])
      // }

      // const totalStock = subtotal

      // if (totalStock === 0) {
      //   return res.status(400).json({
      //     message: "Stock is Empty",
      //   })
      // }

      // if (!findProductsCart && quantity > totalStock) {
      //   return res.status(400).json({
      //     message: "Stock is Empty",
      //   })
      // }

      if (!findProductsCart) {
        const addProductCart = await db.Cart.create({
          UserId: req.user.id,
          ProductId: ProductId,
          quantity: quantity,
          include: [{ model: db.ProductPicture }],
        })

        const findAddProductCart = await db.Cart.findByPk(addProductCart.id, {
          include: [
            {
              model: db.Product,
              include: [
                { model: db.ProductPicture },
                { model: db.ProductStock },
              ],
            },
          ],
        })

        return res.status(200).json({
          message: "Add Product to Cart !",
          data: findAddProductCart,
        })
        // }
        // const cartStock = findProductsCart.Product.ProductStock.map(
        //   (val) => val.stock
        // )

        // let cartTotal = 0

        // for (let i = 0; i < cartStock.length; i++) {
        //   cartTotal += Number(cartStock[i])
        // }

        // const totalStockCart = cartTotal
        // const cartItem = findProductsCart.quantity

        // if (totalStockCart === 0 || totalStockCart < quantity) {
        //   return res.status(400).json({
        //     message: "Product Stock empty",
        //   })
        // }

        // if (totalStockCart === 0 || totalStockCart < cartItem + quantity) {
        //   return res.status(400).json({
        //     message: "Product Stock empty",
        //   })
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
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
  // deleteAllProductCart: async (req,res) =>{
  //   try {
  //     await db.Cart.destroy({
  //       where: {

  //       }
  //     })
  //   } catch (err) {
  //     console.log(err)
  //     return res.status(500).json({
  //       message: err.message
  //     })
  //   }
  // }
}

module.exports = cartController
