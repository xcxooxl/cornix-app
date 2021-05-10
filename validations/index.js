const { getExampleById } = require("./schemes/example");

const validateFactory = (schema, property) => {
	return (req, res, next) => {
		const { error } = schema.validate(req[property]);
		const valid = error == null;
		if (valid) {
			next();
		} else {
			const { details } = error;
			const message = details.map(i => i.message).join(",");
			res.status(422).json({ error: message });
		}
	};
};

const validations = {
	getExampleById,
};

module.exports = {
	validateFactory,
	validations,
};
