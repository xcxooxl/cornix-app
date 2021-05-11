const express = require("express");
const { validations, validateFactory } = require("@validation/index");
const { getSymbolOHLC } = require("@controllers/symbol.controller");
const { getSymbols } = require("@controllers/symbol.controller");

const router = express.Router();

// router.get("/:id", validateFactory(validations.getExampleById, "params"), getExampleById);
router.get("/", getSymbols);
router.get("/:symbol/OHLC", validateFactory(validations.getSymbolChart, "query"), getSymbolOHLC);

module.exports = router;
