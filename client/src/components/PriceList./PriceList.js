import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { columns } from "./columns";
import { useHistory } from "react-router-dom";
import actions from "../../store/actions";

export function PriceList() {
	const symbols = useSelector(state => state.symbol.symbols);
	const dispatch = useDispatch();
	const router = useHistory();

	const isLoading = symbols.length === 0;
	if (isLoading) dispatch(actions.GET_SYMBOLS());

	const goToCryptoChart = symbol => {
		router.push(`/symbol/${symbol}`);
	};

	const getTable = () => {
		let render;
		if (isLoading) render = <div>Loading...</div>;
		else
			render = (
				<MaterialTable
					title="Cornix Coins"
					columns={columns}
					data={symbols}
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
