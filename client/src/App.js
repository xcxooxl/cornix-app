import "./App.css";
import { Route, Switch } from "react-router-dom";
import { CryptoPricesPage } from "./pages/CryptoPrices/CryptoPrices.page";
import { SymbolStatsPage } from "./pages/SymbolChart/SymbolStats.page";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<CryptoPricesPage />
				</Route>
				<Route path="/symbol/:symbol">
					<SymbolStatsPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
