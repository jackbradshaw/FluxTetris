var gulp = require("gulp");
var react = require("gulp-react");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var reactify = require("reactify");
var streamify = require("gulp-streamify");

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

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  watcher.on("update", bundle);
  bundle();

  function bundle() {
    watcher.bundle()
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
