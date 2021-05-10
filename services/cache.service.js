const cache = require("memory-cache");

const HOUR_MILLIS = 60 * 60 * 1000;

const get = key => cache.get(key);
const put = (key, value, ttl = HOUR_MILLIS) => {
	cache.put(key, value, ttl);
};

module.exports = {
	get,
	put,
};
