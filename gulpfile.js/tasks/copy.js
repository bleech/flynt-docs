const browserSync = require('browser-sync')
const changed = require('gulp-changed')
const gulp = require('gulp')

module.exports = function (config) {
  gulp.task('copy', function () {
    gulp.src(config.copy, { base: config.src })
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.stream())
  })
}
