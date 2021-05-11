import Chart from "react-apexcharts";

export const SymbolChart = ({ data }) => {
	if (!data) return <div>Loading...</div>;
	else {
		const chart = {
			options: {
				xaxis: {
					labels: {
						formatter: function (date) {
							return new Date(date).toDateString();
						},
					},
				},
			},
			series: [
				{
					data: data.OHLC,
				},
			],
		};
		return (
			<Chart
				xaxis={chart.options.xaxis}
				options={chart.options}
				series={chart.series}
				type="candlestick"
				height={400}
			/>
		);
	}
};
