const express = require("express");
const { getMarkets } = require("@controllers/market.controller");

const router = express.Router();

// router.get("/:id", validateFactory(validations.getExampleById, "params"), getExampleById);
router.get("/", getMarkets);

module.exports = router;
