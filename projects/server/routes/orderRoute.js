const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")

router.get("/", orderController.getOrder)
router.get("/:id", orderController.getOrderById)
router.patch("/:id/cancel", orderController.cancelOrder)

module.exports = router
