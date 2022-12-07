const express = require("express")
const cartController = require("../controllers/cartsController")

const router = express.Router()

router.post("/", cartController.addToCart)
router.get("/", cartController.showCartItems)

module.exports = router
