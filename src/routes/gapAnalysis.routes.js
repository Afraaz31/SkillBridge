const express = require("express");
const router = express.Router();
const { getGapAnalysis } = require("../controllers/gapAnalysis.controller");
const { protect } = require("../middleware/auth");

router.get("/", protect, getGapAnalysis);

module.exports = router;
