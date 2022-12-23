const db = require("../models")

const paymentController = {
  //   getPayment: async (req, res) => {
  //     try {
  //       const payment = await db.Order.findAll({
  //         attribute: {
  //           payment_date: req.body.payment_date,
  //         },
  //         include: [
  //           { model: db.OrderItem },
  //           { model: db.User },
  //           { model: db.Address },
  //         ],
  //       })

  //       return res.status(200).json({
  //         message: "Get payment",
  //         data: payment,
  //       })
  //     } catch (err) {
  //       console.log(err)
  //       return res.status(500).json({
  //         message: err.message,
  //       })
  //     }
  //   },
  //   confirmPayment: (req, res) => {
  //     try {

  //     } catch (err) {
  //         console.log(err)
  //     }
  //   }

  findPaymentStatus: async (req, res) => {
    try {
      const status = await db.Order.findAll({
        where: {
          attribute: { StatusId: req.body.StatusId },
        },
      })

      return res.status(200).json({
        message: "find status",
        data: status,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: err.message,
      })
    }
  },
  confirmPayment: async (req, res) => {
    try {
      const { id } = req.params
      const findOrder = await db.Order.findOne({
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: "Order is not found",
        })
      }

      await db.Order.update(
        {
          StatusId: 3,
          PaymenStatusId: 2,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findOrderItem = await db.OrderItem.findAll({
        where: {
          OrderId: id,
        },
      })

      const orderItemId = findOrderItem.map((val) => val.id)
      const productId = findOrderItem.map((val) => val.ProductId)
      const quantity = findOrderItem.map((val) => val.quantity)

      const stock = quantity.map((val, item) => {
        return {
          id: orderItemId.id[item],
          productId: productId[item],
          stock: val,
        }
      })

      const total = []
      for (let i = 0; i < productId.length; i++) {
        const findStock = await db.ProductStock.findAll({
          where: {
            ProductId: productId[i],
          },
        })

        total.push(findStock[0].stock)
      }
    } catch (err) {
      console.log(err)
    }
  },
  rejectPayment: async (req, res) => {
    try {
      const { id } = req.params

      const findOrder = await db.Order.findOne({
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: err.message,
        })
      }

      await db.Order.update(
        {
          PaymentStatusId: 3,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findOrderId = await db.Order.findOne({
        where: {
          id: id,
        },
      })

      const link = `http://localhost:3000/payment/wired/${findOrderId.id}`

      const template = fs.readFileSync(
        "./templates/payment/reject.html",
        "utf-8"
      )
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = paymentController
