const express = require("express");
const symbols = require("./symbols");

const router = express.Router();
router.use("/symbols", symbols);

module.exports = router;
