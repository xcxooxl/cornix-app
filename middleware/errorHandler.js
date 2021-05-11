const logger = require("@utils/logger");

const httpErrors = require("restify-errors");
const INTERNAL_SERVER_ERROR_CODE = 500;

const handleErrors = async (err, req, res, next) => {
	if (res.headersSent) return next(err);
	const isManagedException = err instanceof httpErrors.HttpError;

	if (!isManagedException) {
		logger.onError(err, req);
	}
	const isInternalServerError =
		isManagedException && err.statusCode === INTERNAL_SERVER_ERROR_CODE;
	if (!isManagedException || isInternalServerError) {
		if (process.env.NODE_ENV === "production") {
			err.message = "Internal server error, Sorry :(";
		}
		err.statusCode = INTERNAL_SERVER_ERROR_CODE;
	}

	res.status(err.statusCode).json({
		error: err.message,
	});
};
module.exports = handleErrors;
