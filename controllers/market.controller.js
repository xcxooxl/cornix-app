const marketService = require("@services/market.service");
const getMarkets = async (req, res) => {
	const { sort } = req.query;
	const allMarkets = await marketService.getAllMarkets(sort);
	res.json(allMarkets);
};

const getMarketGraph = async (req, res) => {
	const { symbol, limit, since, interval } = req;
	const chartData = await marketService.getMarketGraph(symbol, limit, since, interval);
	return chartData;
};

module.exports = { getMarkets };
