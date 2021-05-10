const axios = require("axios");
const convertInternalToMilliseconds = require("intervals-for-humans");
const cache = require("@services/cache.service");
const ccxt = require("ccxt");
const appConfig = require("@config/index");
const Market = require("../DTO/market");
const TOKENS_CACHE_KEY = "tokens";
const binance = new ccxt.binance({
	apiKey: appConfig.env.BINANCE_API_KEY,
	secret: appConfig.env.BINANCE_API_SECRET,
	enableRateLimit: true,
});

const getMarketPage = pageNum => {
	const marketDataApiUrl = "https://crypto.com/price/coin-data/summary/by_market_cap_page_";
	return axios.get(`${marketDataApiUrl}${pageNum}.json`);
};

const INITIAL_DATE = new Date(2020, 1, 1).getTime();
const HOUR_TIMEFRAME = "1h";
const MAX_CANDLES_PER_REQUEST = 1000;
const getMarketGraph = async (
	symbol,
	interval = HOUR_TIMEFRAME,
	since = INITIAL_DATE,
	limit = new Date().getTime()
) => {
	const tickerName = `${symbol}/USDT`;

	const timeRange = limit - since;
	const intervalInMilliseconds = convertInternalToMilliseconds(interval);
	const rangeExceedsMaxRange = timeRange / intervalInMilliseconds > MAX_CANDLES_PER_REQUEST;
	if (rangeExceedsMaxRange) {
		limit = since + intervalInMilliseconds * MAX_CANDLES_PER_REQUEST;
	}
	const OHLCV = await binance.fetchOHLCV(tickerName, interval, since, limit);
	let counter = 0;
	const candles = OHLCV.map(candle => {
		const candleClose = candle[4];
		const candleTimestamp = candle[0];
		return {
			x: ++counter,
			y: candleClose,
			time: new Date(candleTimestamp).toString(),
		};
	});

	return candles;
};

async function getAllMarketsFromCrypto() {
	let allTokens = [];
	const firstPageResponse = await getMarketPage(1);
	if (firstPageResponse) {
		const { tokens, page_count } = firstPageResponse.data;
		const pageNumberStart = 2;
		const maxPageNumber = page_count - 1;
		const pageNumbers = Array.from({ length: maxPageNumber }, (_, i) => i + pageNumberStart);
		const requestPromises = pageNumbers.map(num => getMarketPage(num));
		const marketTokens = (await Promise.all(requestPromises)).map(
			response => response?.data?.tokens
		);

		allTokens = [...tokens, ...marketTokens.flat()].map(market => new Market(market));
	}
	return allTokens;
}

const getAllMarkets = async () => {
	const cachedMarkets = cache.get(TOKENS_CACHE_KEY);
	if (cachedMarkets) return cachedMarkets;
	const allMarkets = await getAllMarketsFromCrypto();
	cache.put(TOKENS_CACHE_KEY, allMarkets);
	return allMarkets;
};

module.exports = {
	getAllMarkets,
	getMarketGraph,
};
