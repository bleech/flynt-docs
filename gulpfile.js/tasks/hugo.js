const gulp = require('gulp')
const shell = require('gulp-shell')

module.exports = function () {
  let cmd = 'hugo'
  if (process.env.HUGO_BASE_URL) {
    cmd += ` -b ${process.env.HUGO_BASE_URL}`
  }
  gulp.task('hugo', shell.task([cmd]))
}
