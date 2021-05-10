module.exports = class Market {
	constructor(market) {
		this.name = market.name;
		this.marketCap = parseFloat(market.usd_marketcap.toFixed(2));
		this.change = parseFloat((market.usd_change_24h * 100).toFixed(2));
		this.rank = market.ranking;
		this.symbol = market.symbol;
		this.price = parseFloat(market.usd_price.toFixed(2));
	}
};
