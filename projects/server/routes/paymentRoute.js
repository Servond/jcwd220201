const express = require("express")
const paymentController = require("../controllers/paymentController")
const router = express.Router()

router.get("/", paymentController.getPayment)
router.get("/order", paymentController.getOrder)
router.patch("/confirm/:id", paymentController.confirmPayment)
router.patch("/reject/:id", paymentController.rejectPayment)

module.exports = router
