const gulp = require("gulp");
const replace = require("gulp-replace");
const concat = require("gulp-concat");
const gap = require("gulp-append-prepend");
const css2js = require("gulp-css2js");
const { defaultColors } = require("./src/config/settings");

gulp.task("unite-css", () => {
	const isProd = process.env.NODE_ENV === "production";
	let gulpCss = gulp.src("./build/static/css/*.css");

	if (!isProd) {
		gulpCss = gulpCss
			.pipe(replace("$headerBGColor", defaultColors.headerColor))
			.pipe(replace("$bgColor", defaultColors.bgColor))
			.pipe(replace("$btnColor", defaultColors.btnColor)) // todo: didnt set up yet
			.pipe(replace("$textColor", defaultColors.textColor)); // todo: didnt set up yet
	}
	return gulpCss
		.pipe(concat("styles.css"))
		.pipe(css2js({ splitOnNewline: false }))
		.pipe(gulp.dest("./build/static/js"));
});

gulp.task("bundle", () => {
	return gulp
		.src("./build/static/js/*.js")
		.pipe(concat("bundle.js"))
		.pipe(replace("ReactDom", "ReactDOM"))
		.pipe(gulp.dest("./dist/"));
});

gulp.task("add-react", () => {
	return gulp
		.src("./dist/bundle.js")
		.pipe(gap.prependFile("./react-injector.js"))
		.pipe(gulp.dest("./dist"));
});

gulp.task("default", gulp.series("unite-css", "bundle", "add-react"));
