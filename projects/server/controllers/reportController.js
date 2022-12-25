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
        attributes: ["createdAt", "updatedAt", "StatusId", "total_price"],
        where: {
          StatusId: 5,
        },
        include: [
          {
            model: db.OrderItem,
          },

          {
            model: db.User,
          },
          {
            model: db.Product,
          },
        ],
        order: [["createdAt", "DESC"]],
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
  getOrderItem: async (req, res) => {
    try {
      let products = await db.OrderItem.findAll({
        attributes: ["ProductId", "total_price"],

        include: [
          {
            model: db.Product,
          },
        ],
        order: [["total_price", "DESC"]],
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
  getReport: async (req, res) => {
    const CategoryId = req.query.CategoryId
    const WarehouseId = req.query.WarehouseId
    const { createdAt, _limit = 5, _page = 1 } = req.query
    console.log("cat", CategoryId)
    console.log("war", WarehouseId)
    console.log("mnth", createdAt)
    try {
      if (CategoryId && WarehouseId) {
        const findDataFilterCatWar = await db.Order.findAndCountAll({
          include: [
            {
              model: db.User,
            },
            {
              model: db.OrderItem,
              include: [
                {
                  model: db.Product,
                  include: [
                    {
                      model: db.Category,
                    },
                    {
                      model: db.ProductStock,
                    },
                  ],
                  where: { CategoryId },
                },
              ],
              required: true,
            },
          ],
          where: { WarehouseId },
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
        })
        return res.status(200).json({
          message: "Get data filtered",
          data: findDataFilterCatWar.rows,
          dataCount: findDataFilterCatWar.count,
        })
      } else if (WarehouseId) {
        const findDataFilterWar = await db.Order.findAndCountAll({
          include: [
            {
              model: db.User,
            },
            {
              model: db.OrderItem,
              include: [
                {
                  model: db.Product,
                  include: [
                    {
                      model: db.Category,
                    },
                    {
                      model: db.ProductStock,
                    },
                  ],
                },
              ],
              required: true,
            },
          ],
          where: { WarehouseId },
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
        })
        return res.status(200).json({
          message: "Get data filtered",
          data: findDataFilterWar.rows,
          dataCount: findDataFilterWar.count,
        })
      } else if (CategoryId) {
        const findDataFilterCat = await db.Order.findAndCountAll({
          include: [
            {
              model: db.User,
            },
            {
              model: db.OrderItem,
              include: [
                {
                  model: db.Product,
                  include: [
                    {
                      model: db.Category,
                    },
                    {
                      model: db.ProductStock,
                    },
                  ],
                  where: { CategoryId },
                },
              ],
              required: true,
            },
          ],
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
        })
        return res.status(200).json({
          message: "Get data filtered",
          data: findDataFilterCat.rows,
          dataCount: findDataFilterCat.count,
        })
      } else if (createdAt) {
        const findDataFilterMnth = await db.Order.findAndCountAll({
          include: [
            {
              model: db.User,
            },
            {
              model: db.OrderItem,
              include: [
                {
                  model: db.Product,
                  include: [
                    {
                      model: db.Category,
                    },
                    {
                      model: db.ProductStock,
                    },
                  ],
                },
              ],
              required: true,
              subQuery: true,
            },
          ],
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
        })
        return res.status(200).json({
          message: "Get data filtered",
          data: findDataFilterMnth.rows,
          dataCount: findDataFilterMnth.count,
        })
      }

      const findData = await db.Order.findAndCountAll({
        include: [
          {
            model: db.User,
          },
          {
            model: db.OrderItem,
            include: [
              {
                model: db.Product,
                include: [
                  {
                    model: db.Category,
                  },
                  {
                    model: db.ProductStock,
                  },
                ],
              },
            ],
            attributes: [
              sequelize.fn("MONTH", sequelize.col("Order.CreatedAt")),
            ],
          },
        ],
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
      })
      return res.status(200).json({
        message: "Get data",
        data: findData.rows,
        dataCount: findData.count,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = salesReport
