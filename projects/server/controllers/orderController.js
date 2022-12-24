const db = require("../models")

const orderController = {
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
  cancelOrder: async (req, res) => {
    try {
      const findStatus = await db.Order.findOne(req.body.StatusId)

      if (findStatus.StatusId !== 1) {
        return res.status(400).json({
          message: "Status tidak dapat dibatalkan",
        })
      } else {
        await db.Order.update(
          {
            StatusId: 6,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )

        return res.status(200).json({
          message: "update status succes",
          data: findStatus,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}
module.exports = orderController
