import apiService from "../services/api.service";

const actions = {
	GET_SYMBOLS: sort => {
		return async function (dispatch) {
			const symbols = await apiService.getAllSymbols(sort);
			dispatch(actions.SET_SYMBOLS(symbols));
		};
	},
	GET_SYMBOL_OHLC: (symbol, { since, interval } = {}) => {
		return async function (dispatch) {
			const OHLC = await apiService.getSymbolOHLC(symbol, since, interval);
			dispatch(actions.SET_SYMBOL_OHLC(symbol, OHLC));
		};
	},
	SET_SYMBOLS(symbols) {
		return {
			type: "SET_SYMBOLS",
			payload: symbols,
		};
	},
	SET_SYMBOL_OHLC(symbol, OHLC) {
		return {
			type: "SET_SYMBOL_OHLC",
			payload: { name: symbol, OHLC },
		};
	},
};
export default actions;
