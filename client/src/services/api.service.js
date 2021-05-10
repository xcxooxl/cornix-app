const axios = require("axios");
const client = axios.create({
	baseURL: process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/api/",
});

const getAllMarkets = () => {
	return client.get("/markets");
};
