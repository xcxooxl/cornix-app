const symbolService = require("@services/symbol.service");
const getSymbols = async (req, res) => {
	const allSymbols = await symbolService.getAllSymbols();
	res.json(allSymbols);
};

const getSymbolOHLC = async (req, res) => {
	const { symbol } = req.params;
	const { limit, since, interval } = req.query;
	const chartData = await symbolService.getSymbolOHLC(symbol, interval, since, limit);

	res.json(chartData);
};

module.exports = { getSymbols, getSymbolOHLC };
