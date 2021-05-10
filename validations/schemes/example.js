import Joi from "joi";
const getExampleByIdScheme = Joi.object().keys({
	id: Joi.number().positive(),
});
module.exports = { getExampleByIdScheme };
