const express = require("express")
const cartController = require("../controllers/cartsController")

const router = express.Router()

router.post("/", cartController.addToCart)
router.get("/", cartController.showCartItems)
router.delete("/:id", cartController.deleteProductCartById)

module.exports = router
