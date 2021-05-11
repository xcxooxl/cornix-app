import Joi from "joi";
const getSymbolChart = Joi.object().keys({
	symbol: Joi.string(),
	interval: Joi.string().valid("1h", "1d", "1w").optional(),
	since: Joi.date().timestamp().optional(),
	limit: Joi.date().timestamp().optional(),
});
module.exports = { getSymbolChart };
