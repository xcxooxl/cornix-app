import "./App.css";
import { Route, Switch } from "react-router-dom";
import { PriceList } from "./PriceList";

function App() {
	return (
		<div className="App" style={{ direction: "rtl" }}>
			<Switch>
				<Route exact path="/">
					<PriceList />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
