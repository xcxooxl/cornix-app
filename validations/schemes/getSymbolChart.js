const Joi = require("joi");
const getSymbolChart = Joi.object().keys({
	symbol: Joi.string(),
	interval: Joi.string().valid("1h", "1d", "1w").optional(),
	since: Joi.date().timestamp().optional(),
	limit: Joi.date().timestamp().optional().greater(Joi.ref("since")),
});
module.exports = { getSymbolChart };
