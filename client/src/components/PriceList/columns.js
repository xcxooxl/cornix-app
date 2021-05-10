export const columns = [
	{ title: "Name", field: "name", render: data => <div>{data.name}</div> },
	{ title: "Symbol", field: "symbol" },
	{ title: "Price", field: "price", type: "numeric" },
	{
		title: "Market Cap",
		field: "marketCap",
		type: "numeric",
	},
	{
		title: "Rank",
		field: "rank",
		type: "numeric",
	},
	{
		title: "Change%",
		field: "change",
		type: "numeric",
	},
];
