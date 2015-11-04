var gulp = require("gulp");
var react = require("gulp-react");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var reactify = require("reactify");
var streamify = require("gulp-streamify");
var babelify = require("babelify");
var merge = require('utils-merge')

/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }
}
/* */

var path = {
  HTML: "src/index.html",
  MINIFIED_OUT: "build.min.js",
  OUT: "build.js",
  DEST_SRC: "dist/src",
  DEST_BUILD: "dist/build",
  DEST: "dist",
  ENTRY_POINT: "./src/scripts/App.js"
};

gulp.task("default", ["watch"]);

gulp.task("copy", function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task("watch", function() {
  gulp.watch(path.HTML, ["copy"]);

  var args = merge(watchify.args, { debug: true })
    var bundler = watchify(browserify(path.ENTRY_POINT, args)).transform(babelify, { presets : [ "es2015", "react"]});
    bundle(bundler);

    bundler.on('update', function () {
      bundle(bundler);
      gutil.log("Updated");
    });

  function bundle(bundler) {
    bundler.bundle()
      .on('error', map_error)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
    }
});

gulp.task("build", function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});
