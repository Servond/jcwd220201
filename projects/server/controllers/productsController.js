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
        // include: [{ model: db.Category }],
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
        message: "Server Error! ❌",
      })
    }
  },
  getProductsByID: async (req, res) => {
    try {
      const getProductsByID = await db.Product.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: db.category }],
      })

      res.status(200).json({
        message: "Get Products By Id",
        data: getProductsByID,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error! ❌",
      })
    }
  },
  getAllProductsImage: async (req, res) => {
    try {
      const getAllProductsImage = await db.ProductPicture.findAll({
        where: {
          id: req.params.id,
        },
      })

      res.status(200).json({
        message: "Get Product Picture Data",
        data: getAllProductsImage,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error! ❌",
      })
    }
  },
  getProductsImage: async (req, res) => {
    try {
      const getProductsImage = await db.ProductPicture.findOne({
        where: {
          id: req.params.id,
        },
      })

      res.status(200).json({
        message: "Get Product Picture Data",
        data: getProductsImage,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error! ❌",
      })
    }
  },
}

module.exports = productsController
