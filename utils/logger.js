const bunyan = require("bunyan");
const { HttpError } = require("restify-errors");
const log = bunyan.createLogger({ name: "logger" });

const onError = (err, req) => {
	if (err instanceof Error || err instanceof HttpError) {
		log.error({
			msg: err.message,
			stack: err.stack,
			req: {
				body: req.body,
				params: req.params,
				url: req.url,
			},
		});
	}
};

module.exports = { onError, log };
