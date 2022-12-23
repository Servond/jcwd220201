const db = require("../models")
const fs = require("fs")
const emailer = require("../lib/emailer")
const moment = require("moment")

const handlebars = require("handlebars")

const paymentController = {
  getOrder: async (req, res) => {
    try {
      const allOrder = await db.Order.findAll({
        include: [
          {
            model: db.OrderItem,
          },
          {
            model: db.Courier,
          },
          {
            model: db.User,
          },
          {
            model: db.Address,
          },
          {
            model: db.Status,
          },
        ],
        order: [["createdAt", "DESC"]],
      })

      return res.status(200).json({
        message: "Get all user order",
        data: allOrder,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getOrderById: async (req, res) => {
    try {
      const findOrderById = await db.Order.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: db.OrderItem,
          },
          {
            model: db.Courier,
          },
          {
            model: db.User,
          },
          {
            model: db.Address,
          },
          {
            model: db.Status,
          },
        ],
        order: [["createdAt", "DESC"]],
      })

      return res.status(200).json({
        message: "Get all user order",
        data: findOrderById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getPayment: async (req, res) => {
    try {
      const payment = await db.Order.findAll({
        attributes: ["payment_date", "payment_receipt", "total_price"],
        include: [{ model: db.OrderItem }],
      })

      return res.status(200).json({
        message: "Get payment",
        data: payment,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },

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
        },
        {
          where: {
            id: id,
          },
        }
      )

      // const findOrderItem = await db.OrderItem.findAll({
      //   where: {
      //     OrderId: id,
      //   },
      // })

      // const orderItemId = findOrderItem.map((val) => val.id)
      // const productId = findOrderItem.map((val) => val.ProductId)
      // const quantity = findOrderItem.map((val) => val.quantity)

      // const stock = quantity.map((val, item) => {
      //   return {
      //     // id: orderItemId.id[item],
      //     productId: productId[item],
      //     stock: val,
      //   }
      // })

      // const total = []
      // for (let i = 0; i < productId.length; i++) {
      //   const findStock = await db.ProductStock.findAll({
      //     where: {
      //       ProductId: productId[i],
      //     },
      //   })

      //   total.push(findStock[0].stock)
      // }

      // const arr = []
      // for (let i = 0; i < stock.length; i++) {
      //   let result = 0
      //   result = stock[i] - quantity[i]
      //   arr.push(result)
      // }

      // // Make an object
      // const arr1 = arr.map((val, i) => {
      //   return {
      //     orderItemId: orderItemId[i],
      //     productId: productId[i],
      //     quantity: quantity[i],
      //     stock: val,
      //   }
      // })

      // const stockMutation = arr1.filter((val) => {
      //   return val.stock < 0
      // })

      // const selisih = stockMutation.map((val) => val.stock * -1)

      // const ProductMutationId = stockMutation.map((val) => val.productId)

      // const findTransactionItem = stockMutation.map(
      //   (val) => val.transactionItemId
      // )

      // const findClosestWarehouse = await db.Warehouse.findAll()

      // function toRad(Value) {
      //   return (Value * Math.PI) / 180
      // }

      // function calcCrow(lat1, lon1, lat2, lon2) {
      //   var R = 6371 // km
      //   var dLat = toRad(lat2 - lat1)
      //   var dLon = toRad(lon2 - lon1)
      //   var lat1 = toRad(lat1)
      //   var lat2 = toRad(lat2)

      //   var a =
      //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      //     Math.sin(dLon / 2) *
      //       Math.sin(dLon / 2) *
      //       Math.cos(lat1) *
      //       Math.cos(lat2)
      //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      //   var d = R * c
      //   return d
      // }

      // const chooseOne = []
      // const tempDist = []
      // for (var i = 0; i < findClosestWarehouse.length; i++) {
      //   const tempNum = calcCrow(
      //     findOrder.Warehouse.latitude,
      //     findClosestWarehouse[i].latitude,
      //     findOrder.Warehouse.longitude,
      //     findClosestWarehouse[i].longitude
      //   )
      //   tempDist.push(tempNum)
      //   chooseOne.push({
      //     warehouse: findClosestWarehouse[i],
      //     distance: tempNum,
      //   })
      // }
      // const minDist = Math.min(...tempDist)
      // const sortDist = chooseOne.sort((a, b) => a.distance - b.distance)
      // const closestCity = sortDist.filter((x) => x.distance == minDist)
      // const palingDeket = closestCity
      //   .map((val) => val.warehouse.id)
      //   .filter((val) => val != findOrder.WarehouseId)

      // const minusStock = []
      // for (let i = 0; i < ProductMutationId.length; i++) {
      //   const findTotalStockProduct = await db.Stock.findAll({
      //     where: {
      //       WarehouseId: palingDeket[0],
      //       ProductId: ProductMutationId[i],
      //     },
      //   })

      //   minusStock.push(
      //     findTotalStockProduct.map((val) => val.stock - selisih[i])
      //   )
      // }

      // const plushStock = []
      // for (let i = 0; i < ProductMutationId.length; i++) {
      //   const findTotalStockProduct = await db.Stock.findAll({
      //     where: {
      //       WarehouseId: findOrder.WarehouseId,
      //       ProductId: ProductMutationId[i],
      //     },
      //   })

      //   plushStock.push(
      //     findTotalStockProduct.map((val) => val.stock + selisih[i])
      //   )
      // }

      // for (let i = 0; i < findTransactionItem.length; i++) {
      //   await db.StockRequest.create({
      //     FromWarehouseId: findOrder.WarehouseId,
      //     ToWarehouseId: palingDeket[0],
      //     // quantity: selisih[i],
      //     is_approve: 1,
      //     // ProductId: ProductMutationId[i],
      //   })
      //   await db.Stock.update(
      //     {
      //       stock: minusStock[i],
      //     },
      //     {
      //       where: {
      //         WarehouseId: palingDeket[0],
      //         ProductId: ProductMutationId[i],
      //       },
      //     }
      //   )
      //   await db.Stock.update(
      //     {
      //       stock: plushStock[i],
      //     },
      //     {
      //       where: {
      //         WarehouseId: findOrder.WarehouseId,
      //         ProductId: ProductMutationId[i],
      //       },
      //     }
      //   )
      // }

      // const finalStock = []
      // for (let i = 0; i < productId.length; i++) {
      //   const findTotalStockProduct = await db.Total_Stock.findAll({
      //     where: {
      //       WarehouseId: findOrder.WarehouseId,
      //       ProductId: productId[i],
      //     },
      //   })

      //   finalStock.push(
      //     findTotalStockProduct.map((val) => val.stock - quantity[i])
      //   )
      // }

      // for (let i = 0; i < productId.length; i++) {
      //   await db.Total_Stock.update(
      //     {
      //       stock: finalStock[i],
      //     },
      //     {
      //       where: {
      //         ProductId: productId[i],
      //         WarehouseId: findOrder.WarehouseId,
      //       },
      //     }
      //   )
      // }

      const findApproveTrasanction = await db.Order.findOne({
        where: {
          id: id,
        },
        include: [{ model: db.User }],
      })

      const totalBill = findApproveTrasanction.total_price
      const paymentDate = moment(findApproveTrasanction.payment_date).format(
        "dddd, DD MMMM YYYY, HH:mm:ss"
      )
      const transactionLink = `http://localhost:3000/transaction-list`

      const rawHTML = fs.readFileSync("templates/payment/approve.html", "utf-8")

      const compiledHTML = handlebars.compile(rawHTML)

      const htmlResult = compiledHTML({
        email: findApproveTrasanction.User.email,
        totalBill: totalBill.toLocaleString(),

        dateAndTime: `${paymentDate} WIB`,
        transactionListLink: transactionLink,
      })

      await emailer({
        to: findApproveTrasanction.User.email,
        html: htmlResult,
        subject: "Payment Verified",
        text: "Thank You",
      })
      return res.status(200).json({
        message: "confirm payment success",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: err.message,
      })
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
          message: "order not found",
        })
      }

      await db.Order.update(
        {
          StatusId: 1,
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
        include: [{ model: db.User }],
      })

      const link = `http://localhost:3000/payment/wired/${findOrderId.id}`

      const template = fs.readFileSync(
        "./templates/payment/reject.html",
        "utf-8"
      )

      const compiledHTML = handlebars.compile(template)

      const htmlResult = compiledHTML({
        email: findOrderId.User.email,
        link,
      })

      await emailer({
        to: findOrderId.User.email,
        subject: "Reject Payment",
        html: htmlResult,
        text: "Please reupload your payment proof",
      })

      return res.status(200).json({
        message: "Payment Rejected",
        data: findOrderId,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = paymentController
