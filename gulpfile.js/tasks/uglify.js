const browserSync = require('browser-sync')
const gulp = require('gulp')
const pump = require('pump')
const uglify = require('gulp-uglify')

module.exports = function (config) {
  gulp.task('uglify', function (cb) {
    pump([
        gulp.src(config.uglify, { base: config.src }),
        uglify(),
        gulp.dest(config.dest),
        browserSync.stream()
      ],
      cb
    );
  })
}
