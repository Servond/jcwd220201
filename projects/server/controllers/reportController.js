const moment = require("moment")
const { Op } = require("sequelize")
const { sequelize } = require("../models")
const db = require("../models")

const salesReport = {
  getTodayOrder: async (req, res) => {
    const TODAY_START = moment().startOf("day")
    const NOW = moment().format("YYYY-MM-DD HH:mm")
    try {
      const todayOrder = await db.Order.count({
        where: {
          createdAt: {
            [Op.gt]: TODAY_START,
            [Op.lt]: NOW,
          },
          StatusId: {
            [Op.ne]: 5,
          },
        },
      })

      const yesterdayOrder = await db.Order.count({
        where: {
          createdAt: {
            [Op.gt]: moment(TODAY_START).subtract(1, "day"),
            [Op.lt]: TODAY_START,
          },
          StatusId: {
            [Op.ne]: 5,
          },
        },
      })

      const todayAndYesterdayOrder = {
        todayOrder,
        yesterdayOrder,
      }

      return res.status(200).json({
        message: "transaksi ditemukan",
        data: todayAndYesterdayOrder,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  highRevenue: async (req, res) => {
    try {
      const { _sortDir = "DESC" } = req.query
      let products = await db.Order.findAll({
        attributes: ["createdAt", "total_price"],
        order: [["total_price", _sortDir]],

        where: {
          StatusId: 5,
        },
      })
      return res.status(200).json({
        message: "high revenue",
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  lowRevenue: async (req, res) => {
    try {
      const { _sortDir = "ASC" } = req.query
      let products = await db.Order.findAndCountAll({
        attributes: ["createdAt", "total_price"],
        order: [["total_price", _sortDir]],

        where: {
          StatusId: 5,
        },
      })
      return res.status(200).json({
        message: "Low revenue",
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllTransactions: async (req, res) => {
    try {
      let products = await db.Order.findAll({
        attributes: ["createdAt", "updatedAt", "StatusId"],
        where: {
          status: 5,
        },
        include: [[db.OrderItem], [db.Status]],
      })
      return res.status(200).json({
        message: "get All transaction",
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = salesReport
