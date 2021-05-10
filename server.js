const express = require("express");
const handleErrors = require("@middleware/errorHandler");
const routes = require("@routes/api");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
	const corsOptions = {
		origin: (origin, callback) => {
			if (!origin || origin.includes("localhost")) callback(null, true);
		},
	};
	app.use(cors(corsOptions));
}

// Routes
app.use("/api", routes);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(handleErrors);

app.use(express.static("client/build/static"));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// 	});rr
// }

// Initialization
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
