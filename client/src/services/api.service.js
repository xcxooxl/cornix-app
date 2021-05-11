const axios = require("axios");
const client = axios.create({
	baseURL: process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:5000/api/",
});

const getAllSymbols = async () => {
	const response = await client.get("/symbols");
	return response?.data;
};
const getSymbolOHLC = async (symbol, since, interval) => {
	const response = await client.get(`/symbols/${symbol}/OHLC`, {
		params: {
			since,
			interval,
		},
	});
	return response?.data;
};

export default {
	getAllSymbols,
	getSymbolOHLC,
};
