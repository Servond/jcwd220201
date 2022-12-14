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
      const findProductStockId = await db.Product.findByPk(ProductId, {
        include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
      })

      const stock = findProductStockId.ProductStocks.map((val) => val.stock)
      let subtotal = 0

      for (let i = 0; i < stock.length; i++) {
        subtotal += Number(stock[i])
      }

      const totalStock = subtotal

      if (totalStock === 0) {
        return res.status(400).json({
          message: "Product Stock is Empty",
        })
      }

      if (!findProductsCart && quantity > totalStock) {
        return res.status(400).json({
          message: "Product Stock is Empty",
        })
      }

      if (!findProductsCart) {
        const addProductCart = await db.Cart.create({
          UserId: req.user.id,
          ProductId: ProductId,
          quantity: quantity,
        })

        const findProductItemInCart = await db.Cart.findByPk(
          addProductCart.id,
          {
            include: [
              {
                model: db.Product,
                include: [
                  { model: db.ProductPicture },
                  { model: db.ProductStock },
                ],
              },
            ],
          }
        )

        return res.status(200).json({
          message: "Add Product to Cart ",
          data: findProductItemInCart,
        })
      }
      const cartStock = findProductsCart.Product.ProductStocks.map(
        (val) => val.stock
      )

      let cartTotal = 0

      for (let i = 0; i < cartStock.length; i++) {
        cartTotal += Number(cartStock[i])
      }

      const totalStockCart = cartTotal
      const cartItem = findProductsCart.quantity

      if (totalStockCart === 0 || totalStockCart < quantity) {
        return res.status(400).json({
          message: "Product Stock is empty",
        })
      }

      if (totalStockCart === 0 || totalStockCart < cartItem + quantity) {
        return res.status(400).json({
          message: "Product Stock is empty",
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllMyCartItems: async (req, res) => {
    try {
      const getUserCartItem = await db.Cart.findAll({
        where: { UserId: req.user.id },
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
        order: [["createdAt", "DESC"]],
      })

      return res.status(200).json({
        message: "Products in Cart!",
        data: getUserCartItem,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getCartProductById: async (req, res) => {
    try {
      const { ProductId } = req.params
      const getCartProductById = await db.Cart.findOne({
        where: { ProductId },
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })
      return res.status(200).json({
        message: "Get Product Cart By Id",
        data: getCartProductById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getCartById: async (req, res) => {
    try {
      const { id } = req.params
      const getCartById = await db.Cart.findByPk(id, {
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })
      return res.status(200).json({
        message: "Get Cart By Id",
        data: getCartById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  checkProduct: async (req, res) => {
    try {
      const { id } = req.params

      const checkProduct = await db.Cart.findByPk(id)

      if (checkProduct.is_checked === true) {
        await db.Cart.update(
          { is_checked: false },
          { where: { id: checkProduct.id } }
        )

        const uncheckProduct = await db.Cart.findByPk(id, {
          include: [
            { model: db.Product, include: [{ model: db.ProductPicture }] },
          ],
        })

        return res.status(200).json({
          message: "Product Uncheck",
          data: uncheckProduct,
        })
      }

      await db.Cart.update(
        { is_checked: true },
        { where: { id: checkProduct.id } }
      )

      const checkProductById = await db.Cart.findByPk(id, {
        include: [
          { model: db.Product, include: [{ model: db.ProductPicture }] },
        ],
      })

      return res.status(200).json({
        message: "Product Checked",
        data: checkProductById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  checkAllProduct: async (req, res) => {
    try {
      const checkAllProduct = await db.Cart.findAll({
        where: { UserId: req.user.id },
        include: [
          { model: db.Product, include: [{ model: db.ProductPicture }] },
        ],
      })

      const productCheck = checkAllProduct.map((val) => val.is_checked)

      if (!productCheck.includes(false)) {
        await db.Cart.update(
          { is_checked: false },
          { where: { UserId: req.user.id } }
        )

        const uncheckAllProduct = await db.Cart.findAll({
          where: { UserId: req.user.id },
          include: [
            { model: db.Product, include: [{ model: db.ProductPicture }] },
          ],
        })

        return res.status(200).json({
          message: "All Product Uncheck",
          data: uncheckAllProduct,
        })
      }

      await db.Cart.update(
        { is_checked: true },
        { where: { UserId: req.user.id } }
      )

      const findCheckAllProduct = await db.Cart.findAll({
        where: { UserId: req.user.id },
        include: [
          { model: db.Product, include: [{ model: db.ProductPicture }] },
        ],
      })

      return res.status(200).json({
        message: "All Product Checked",
        data: findCheckAllProduct,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  // addToCartByProductId: async (req, res) => {
  //   try {
  //     const { ProductId } = req.params
  //     const { quantity } = req.body
  //     const addProductCart = await db.Cart.findOne({
  //       where: { ProductId },
  //       include: [
  //         {
  //           model: db.Product,
  //           include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
  //         },
  //       ],
  //     })

  //     const productStock = addProductCart
  //   } catch (err) {
  //     console.log(err)
  //     return res.status(500).json({
  //       message: err.message,
  //     })
  //   }
  // },
  // G1-21 ⬇️
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
