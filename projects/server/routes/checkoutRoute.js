const express = require("express");

// Own library imports
const {
  getAddresses,
  selectAddress,
} = require("../controllers/checkoutController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getAddresses);
router.patch("/address", verifyToken, selectAddress);

module.exports = router;
