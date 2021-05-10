import "./App.css";
import { Route, Switch } from "react-router-dom";
import { CryptoPrices } from "./pages/CryptoPrices";
import { HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from "react-vis";

function MarketChart() {
	const plot = (
		<XYPlot width={300} height={300}>
			<HorizontalGridLines />
			<LineSeries
				data={[
					{ x: new Date(2020, 1, 1), y: 100 },
					{ x: new Date(2020, 1, 2), y: 5 },
					{ x: new Date(2020, 1, 3), y: 15 },
				]}
			/>
			<XAxis />
			<YAxis />
		</XYPlot>
	);
	return plot;
}

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<CryptoPrices />
				</Route>
				<Route path="/market/:symbol">
					<MarketChart />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
