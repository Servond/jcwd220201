const express = require("express")
const cartController = require("../controllers/cartsController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", verifyToken, cartController.addToCart)
router.get("/", cartController.showCartItems)
router.delete("/:id", cartController.deleteProductCartById)

module.exports = router
