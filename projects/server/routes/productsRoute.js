const express = require("express")
const productsController = require("../controllers/productsController")
const router = express.Router()

router.get("/", productsController.getAllProducts)
router.get("/:id", productsController.getProductsByID)
router.get("/image", productsController.getAllProductsImage)
router.get("/image/:id", productsController.getProductsImage)

module.exports = router
