const gulp = require('gulp')
const shell = require('gulp-shell')

// TODO: get rid of this (hugo v0.20 supports custom output formats)
module.exports = function () {
  gulp.task('buildSearchIndex', shell.task(['node ./gulpfile.js/utils/buildSearchIndex.js']))
}
