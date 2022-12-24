const express = require("express")
const salesReport = require("../controllers/reportController")

const router = express.Router()

router.get("/", salesReport.getTodayOrder)
// router.get("/order", salesReport.orderTime)
router.get("/highrevenue", salesReport.highRevenue)
router.get("/lowrevenue", salesReport.lowRevenue)
router.get("/order", salesReport.getAllTransactions)

module.exports = router
