const express = require("express");

// Own library imports
const {
  getAddresses,
  selectAddress,
  findNearestWarehouse,
} = require("../controllers/checkoutController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getAddresses);
router.patch("/address", verifyToken, selectAddress);
router.get("/nearest_warehouse", verifyToken, findNearestWarehouse);

module.exports = router;
