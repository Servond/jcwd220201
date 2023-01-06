const express = require("express")
const paymentController = require("../controllers/paymentController")
const productAdminController = require("../controllers/productsAdminController")
const warehousesController = require("../controllers/warehousesController")
const authController = require("../controllers/authController")
const {
  findNearestWarehouse,
  getCartItems,
} = require("../controllers/checkoutController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = express.Router()

router.get("/", paymentController.getPayment)
// router.get("/order", paymentController.getPayment)
router.get("/:id", paymentController.getPaymentById)
router.get("product-admin", productAdminController.getAllProduct)
router.get("/", authController.getAllUser)
router.get("/", warehousesController.getAllWarehouses)

// get nearest warehouse
router.get("/nearest_warehouse", verifyToken, findNearestWarehouse)

// get cart items
router.get("/cart", verifyToken, getCartItems)

// router.get("/product", paymentController.getProductPayment)
router.patch("/confirm/:id", paymentController.confirmPayment)
router.patch("/reject/:id", paymentController.rejectPayment)

module.exports = router
