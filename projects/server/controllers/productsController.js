const db = require("../models")
const { Op } = require("sequelize")
const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const {
        _limit = 10,
        _page = 1,
        _sortBy = "id",
        _sortDir = "ASC",
      } = req.query
      const getAllProducts = await db.Product.findAndCountAll({
        where: {
          product_name: {
            [Op.like]: `%${req.query.product_name || ""}%`,
          },
        },
        // include: [{ model: db.ProductPicture }],
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [[_sortBy, _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Product",
        data: getAllProducts.rows,
        dataCount: getAllProducts.count,
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

      const getProductsByID = await db.Product.findByPk(id)

      // include: [{ model: db.category }],

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
