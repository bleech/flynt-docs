const gulp = require('gulp')
const shell = require('gulp-shell')

module.exports = function () {
  gulp.task('hugo', shell.task(['hugo']))
}
