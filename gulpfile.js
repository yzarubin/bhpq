'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('test', () => {
  return gulp.src('./test/**/*.spec.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('build', function() {
  gulp.src(['./lib/bhpq.js'])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/'))
});
