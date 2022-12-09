const express = require("express");
const { addNewAddress } = require("../controllers/addressController");

const router = express.Router();

router.post("/", addNewAddress);

module.exports = router;
