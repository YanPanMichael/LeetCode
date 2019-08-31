var gulp = require("gulp");
var babel = require("gulp-babel");

//./node_modules/.bin/babel src -d build -s

gulp.task("default", function () {
  return gulp.src("src/index.js")
    .pipe(babel())
    .pipe(gulp.dest("build"));
});