const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")

router.post("/cancel/:id", orderController.cancelOrder)
router.get("/", orderController.getOrder)
router.get("/:id", orderController.getOrderById)

module.exports = router
