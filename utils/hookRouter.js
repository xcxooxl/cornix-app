// https://dev.to/dudinirgad/express-js-async-sync-global-exception-handler-1ll7, Dudi Nirgad
// Patented =)

const asyncHandler = require("express-async-handler");
const express = require("express");
const originalRouterFunc = express.Router;

const routeErrorHandler = routeWrapper =>
	asyncHandler(function (req, res, next) {
		try {
			return routeWrapper(req, res, next);
		} catch (e) {
			next(e, req, res); // pass exception to our error handler.
		}
	});

const hookAllRouteMethods = router => {
	const methods = ["get", "post", "put", "delete", "options", "head", "all", "use"]; // all router methods
	methods.forEach(method => {
		const originalRouterFunc = router[method];
		const hookedRouterMethod = async function (path, ...routeHandlers) {
			routeHandlers = routeHandlers.map(r => routeErrorHandler(r));
			originalRouterFunc.apply(router, [path, ...routeHandlers]);
		};
		router[method] = hookedRouterMethod;
	});
};

const hookRouter = function () {
	express.Router = function () {
		const router = originalRouterFunc.apply(this, arguments);
		hookAllRouteMethods(router);
		return router;
	};
};
module.exports = { hookRouter };
