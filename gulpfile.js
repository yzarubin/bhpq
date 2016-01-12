'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
  return gulp.src('./test/**/*.spec.js')
    .pipe(mocha({reporter: 'spec'}));
});