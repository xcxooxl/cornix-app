import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../../store/actions";
import { SymbolChart } from "../../components/SymbolChart/SymbolChart";
import styles from "./SymbolStats.module.css";
import { useRef } from "react";

const DAY_MILLISECONDS = 60 * 60 * 24 * 1000;

export function SymbolStatsPage() {
	const dispatch = useDispatch();
	const { symbol } = useParams();
	const symbolData = useSelector(state => state.symbol.symbol);
	const settings = useRef({ since: new Date().getTime() - DAY_MILLISECONDS, interval: "1h" });
	if (!symbolData || symbol !== symbolData?.name)
		dispatch(actions.GET_SYMBOL_OHLC(symbol, settings.current));

	const onDayRangeChanged = event => {
		const dayRange = event.target.value;
		settings.current.since = new Date().getTime() - dayRange * DAY_MILLISECONDS;
		dispatch(actions.GET_SYMBOL_OHLC(symbol, settings.current));
	};

	const onIntervalChanged = event => {
		const interval = event.target.value;
		settings.current.interval = interval;
		dispatch(actions.GET_SYMBOL_OHLC(symbol, settings.current));
	};

	return (
		<div>
			<div className={styles.filters}>
				<div className={styles.filter}>
					<div>Range</div>
					<select onChange={onDayRangeChanged}>
						<option value="1">Last 24 hours</option>
						<option value="7">Last 7 days</option>
						<option value="30">Last 30 days</option>
						<option value="90">Last 90 days</option>
					</select>
				</div>
				<div className={styles.filter}>
					<div>Interval</div>
					<select onChange={onIntervalChanged}>
						<option value="1h">1 hour</option>
						<option value="1d">1 day</option>
						<option value="1w">1 week</option>
					</select>
				</div>
			</div>
			<SymbolChart data={symbolData} />
		</div>
	);
}
