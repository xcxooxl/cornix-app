module.exports = class Symbol {
	constructor(symbol) {
		this.name = symbol.name;
		this.marketcap = parseFloat(symbol.usd_marketcap.toFixed(2));
		this.change = parseFloat((symbol.usd_change_24h * 100).toFixed(2));
		this.rank = symbol.ranking;
		this.symbol = symbol.symbol;
		this.price = parseFloat(symbol.usd_price.toFixed(2));
	}
};
