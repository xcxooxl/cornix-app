export const columns = [
	{ title: "Name", field: "name", render: data => <div>{data.name}</div> },
	{ title: "Symbol", field: "symbol" },
	{ title: "Price", field: "price", type: "numeric" },
	{
		title: "Symbol Cap",
		field: "marketcap",
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
