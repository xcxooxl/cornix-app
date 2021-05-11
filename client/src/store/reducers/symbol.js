const initialState = {
	symbols: [],
	OHLC: null,
};
export default function SymbolReducer(state = initialState, action) {
	switch (action.type) {
		case "SET_SYMBOLS":
			state.symbols = action.payload;
			break;
		case "SET_SYMBOL_OHLC":
			state.symbol = action.payload;
			break;
		default:
			return state;
	}
	return state;
}
