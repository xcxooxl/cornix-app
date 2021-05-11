const axios = require("axios");
const convertInternalToMilliseconds = require("intervals-for-humans");
const cache = require("@services/cache.service");
const ccxt = require("ccxt");
const appConfig = require("@config/index");
const Symbol = require("../DTO/symbol");
const TOKENS_CACHE_KEY = "tokens";

const binance = new ccxt.binance({
	apiKey: appConfig.env.BINANCE_API_KEY,
	secret: appConfig.env.BINANCE_API_SECRET,
	enableRateLimit: true,
});

const getSymbolPage = pageNum => {
	const symbolDataApiUrl = "https://crypto.com/price/coin-data/summary/by_market_cap_page_";
	return axios.get(`${symbolDataApiUrl}${pageNum}.json`);
};

const INITIAL_DATE = new Date(2021, 1, 1).getTime();
const HOUR_INTERVAL = "1h";
const MAX_CANDLES_PER_REQUEST = 1000;
const getSymbolOHLC = async (
	symbol,
	interval = HOUR_INTERVAL,
	since,
	limit = new Date().getTime()
) => {
	const tickerName = `${symbol}/USDT`;

	if (!since) since = INITIAL_DATE;
	else since = parseInt(since);
	const timeRange = limit - since;
	const intervalInMilliseconds = convertInternalToMilliseconds(interval);
	const rangeExceedsMaxRange = timeRange / intervalInMilliseconds > MAX_CANDLES_PER_REQUEST;
	if (rangeExceedsMaxRange) {
		limit = since + intervalInMilliseconds * MAX_CANDLES_PER_REQUEST;
	}

	const OHLCV = await binance.fetchOHLCV(tickerName, interval, since, limit);
	const OHLCWithoutVolume = OHLCV.map(ohlcv => ohlcv.slice(0, ohlcv.length - 1));
	return OHLCWithoutVolume;
};

async function getAllSymbolsFromCrypto() {
	let allTokens = [];
	const firstPageResponse = await getSymbolPage(1);
	if (firstPageResponse) {
		const { tokens, page_count } = firstPageResponse.data;
		const pageNumberStart = 2;
		const maxPageNumber = page_count - 1;
		const pageNumbers = Array.from({ length: maxPageNumber }, (_, i) => i + pageNumberStart);
		const requestPromises = pageNumbers.map(num => getSymbolPage(num));
		const symbolTokens = (await Promise.all(requestPromises)).map(
			response => response?.data?.tokens
		);

		allTokens = [...tokens, ...symbolTokens.flat()].map(symbol => new Symbol(symbol));
	}
	return allTokens;
}

const getAllSymbols = async () => {
	const cachedSymbols = cache.get(TOKENS_CACHE_KEY);
	if (cachedSymbols) return cachedSymbols;
	const allSymbols = await getAllSymbolsFromCrypto();
	cache.put(TOKENS_CACHE_KEY, allSymbols);
	return allSymbols;
};

module.exports = {
	getAllSymbols,
	getSymbolOHLC,
};
