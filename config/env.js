const defaultConf = {
	BINANCE_API_KEY: "xxxxxxxxxxxxxxxx",
	BINANCE_API_SECRET: "xxxxxxxxxxxxx",
	APP_NAME: "Cornix",
};

const appConfig = new Proxy(defaultConf, {
	get(target, p) {
		return process.env[p] || target[p];
	},
});

module.exports = appConfig;
