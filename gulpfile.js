var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var paths = {
  scripts: 'src/js/**',
  styles: 'src/scss/**'
};

gulp.task('clean', function(cb) {
  del(['build/**'], cb);
});

gulp.task('scripts', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('./src/js/main.js')
    .pipe(browserified)
    .pipe(gulp.dest('./build'));
});

gulp.task('styles', function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['clean'], function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);
