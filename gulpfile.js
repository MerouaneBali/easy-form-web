const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const buildStyles = () =>
  gulp
    .src("./src/styles/sass/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./src/styles/css"));

function watch() {
  gulp.watch("./src/styles/sass/**/*.scss").on("change", buildStyles);
}

exports.buildStyles = buildStyles;
exports.watch = watch;
