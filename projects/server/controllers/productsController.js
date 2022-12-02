const db = require("../models")
const { Op } = require("sequelize")
Product = db.Product
const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const {
        category_id = "",
        _limit = 10,
        _page = 1,
        _sortBy = "id",
        _sortDir = "ASC",
      } = req.query

      if (_sortBy === "category_id") {
      }
      {
        if (!Number(category_id)) {
          const getAllProducts1 = await Product.findAndCountAll({
            where: {
              product_name: {
                [Op.like]: `%${req.query.product_name || ""}%`,
              },
            },
            include: [{ model: db.Category }],
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            order: [[_sortBy, _sortDir]],
          })

          return res.status(200).json({
            message: "Get All Product",
            data: getAllProducts1.rows,
            dataCount: getAllProducts1.count,
          })
        }
      }

      const getAllProducts2 = await Product.findAndCountAll({
        where: {
          product_name: {
            [Op.like]: `%${req.query.product_name || ""}%`,
          },
          category_id,
        },

        include: [{ model: db.Category }],
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [[_sortBy, _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Product",
        data: getAllProducts2.rows,
        dataCount: getAllProducts2.count,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getProductsByID: async (req, res) => {
    try {
      const { id } = req.params

      const getProductsByID = await db.Product.findByPk(id, {
        include: [{ model: db.Category }],
      })

      res.status(200).json({
        message: "Get Products By Id",
        data: getProductsByID,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.mesage,
      })
    }
  },
  getProductCategory: async (req, res) => {
    try {
      const findProductCategory = await Category.findAll()
      return res.status(200).json({
        message: "Get Product Category",
        data: findProductCategory,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getProductsImage: async (req, res) => {
    try {
      const { id } = req.params

      const getProductsImage = await db.ProductPicture.findByPk(id)

      res.status(200).json({
        message: "Get Product Picture Data",
        data: getProductsImage,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = productsController
