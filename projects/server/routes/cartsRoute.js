const express = require("express")
const cartController = require("../controllers/cartsController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", verifyToken, cartController.addToCart)
router.get("/me", verifyToken, cartController.getAllMyCartItems)
router.get("/:id", cartController.getCartById)
router.get(
  "/cart-product/ProductId/:ProductId",
  cartController.getCartProductById
)
router.patch("/productCheck/:id", cartController.checkProduct)
router.patch("/checkAllProduct", verifyToken, cartController.checkAllProduct)
router.delete("/:id", cartController.deleteProductCartById)

module.exports = router
