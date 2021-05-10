import apiService from "../services/api.service";

const actions = {
	GET_MARKETS: sort => {
		return async function (dispatch) {
			const markets = await apiService.getAllMarkets(sort);
			dispatch(actions.SET_MARKETS(markets));
		};
	},
	SET_MARKETS(markets) {
		return {
			type: "SET_MARKETS",
			payload: markets,
		};
	},
};
export default actions;
