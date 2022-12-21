const express = require("express");

// Own library imports
const { getAddresses } = require("../controllers/checkoutController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getAddresses);

module.exports = router;
