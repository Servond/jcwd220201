const express = require("express")
const warehouseUserController = require("../controllers/warehouseUserController")

const router = express.Router()

router.post("/", warehouseUserController.createUserHouse)
router.get("/", warehouseUserController.getAllWareUser)
router.patch("/:id", warehouseUserController.updateWareUserById)
router.delete("/:id", warehouseUserController.deleteWareUserById)

module.exports = router
