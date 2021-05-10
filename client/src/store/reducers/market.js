const initialState = {
	markets: [],
};
export default function MarketReducer(state = initialState, action) {
	switch (action.type) {
		case "SET_MARKETS":
			state.markets = action.payload;
			return state;
		default:
			return state;
	}
	return state;
}
