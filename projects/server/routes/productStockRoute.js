const express = require("express")
const productStockController = require("../controllers/productStockController")
const router = express.Router()

// Get All Warehouse
router.get("/allWarehouse", productStockController.getAllWarehouse)

module.exports = router
