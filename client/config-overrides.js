/* config-overrides.js */

function removeCSSMiniExtractPlugin(allRules) {
	const cssLoaders = allRules.filter(rule =>
		rule.use?.some(options => options.loader.includes("css-loader"))
	);

	cssLoaders.forEach(rule => {
		let rulesWithoutMiniCss = rule.use.filter(use => !use.loader.includes("mini-css"));
		rulesWithoutMiniCss = [{ loader: "style-loader" }, ...rulesWithoutMiniCss];
		rule.use = rulesWithoutMiniCss;
	});
}

function inlineImages(allRules) {
	const urlLoader = allRules[1];
	urlLoader.options = {
		limit: 1024 * 1024,
		encoding: "base64",
	};
	delete urlLoader.options.name;
}

module.exports = function override(config, env) {
	//do stuff with the webpack config...
	config.optimization.splitChunks = {
		cacheGroups: {
			default: false,
		},
	};
	config.optimization.runtimeChunk = false;
	config.devtool = "hidden-source-map";
	delete config.output.chunkFilename;
	config.output.filename = "static/js/main.js";
	const allRules = config.module.rules[1].oneOf;

	inlineImages(allRules);
	removeCSSMiniExtractPlugin(allRules);
	return config;
};
