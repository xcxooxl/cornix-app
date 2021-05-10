function loadApp() {
	let root = document.createElement("div");
	root.id = "root";
	document.body.appendChild(root);
	let script = document.createElement("script");
	script.src =
		"https://itsu-staging.herokuapp.com/business/night-cookie/itsu.js?cachebreaker=" +
		new Date().getTime();
	document.body.appendChild(script);
}

loadApp();
