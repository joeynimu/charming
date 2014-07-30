var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  karma = require('gulp-karma'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var paths = {
  src: ['src/*.js'],
  test: ['test/spec/**/*.spec.js'],
  dist: 'dist/'
};

gulp.task('lint', function () {
  return gulp.src([__filename].concat(paths.src).concat(paths.test))
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
  return gulp.src(paths.src.concat(paths.test))
    .pipe(plumber())
    .pipe(karma({ configFile: 'test/karma.conf.js' }))
    .on('error', function (err) { throw err; });
});

gulp.task('clean', function () {
  return gulp.src(paths.dist, { read: false })
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('dist', ['clean'], function () {
  return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', [
  'lint',
  'test',
  'dist'
]);
