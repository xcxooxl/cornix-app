const initialState = {
	markets: [],
};
export default function MarketReducer(state = initialState, action) {
	switch (action.type) {
		case "SET_MARKETS":
			state.from = action.payload;
			break;
		default:
			return state;
	}
	return state;
}
