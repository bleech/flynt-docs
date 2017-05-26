const gulp = require('gulp')
const changed = require('gulp-changed')

module.exports = function (config) {
  gulp.task('copy', function () {
    gulp.src(config.copy, { base: config.src })
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest))
  })
}
