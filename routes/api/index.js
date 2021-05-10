const express = require("express");
const markets = require("./markets");

const router = express.Router();
router.use("/markets", markets);

module.exports = router;
