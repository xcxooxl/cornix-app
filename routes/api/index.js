const express = require("express");
const binance = require("./markets");

const router = express.Router();
router.use("/binance", binance);

module.exports = router;
