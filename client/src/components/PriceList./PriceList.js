import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { columns } from "./columns";
import { useHistory } from "react-router-dom";
import actions from "../../store/actions";

export function PriceList() {
	const markets = useSelector(state => state.market.markets);
	const dispatch = useDispatch();
	const router = useHistory();

	const isLoading = markets.length === 0;
	if (isLoading) dispatch(actions.GET_MARKETS());

	const goToCryptoChart = symbol => {
		router.push(`/market/${symbol}`);
	};

	const getTable = () => {
		let render;
		if (isLoading) render = <div>Loading...</div>;
		else
			render = (
				<MaterialTable
					title="Cornix Coins"
					columns={columns}
					data={markets}
					actions={[
						{
							icon: "show_chart",
							tooltip: "Show Chart",
							onClick: (event, rowData) => goToCryptoChart(rowData.symbol),
						},
					]}
				/>
			);
		return render;
	};

	return <div style={{ maxWidth: "100%" }}>{getTable()}</div>;
}
