const gulp = require('gulp')
const runSequence = require('run-sequence')

module.exports = function() {
  gulp.task('build', function (cb) {
    runSequence(
      'clean',
      ['copy', 'sass', 'uglify', 'setBase:production', 'buildSearchIndex'],
      'hugo',
      'rev',
      cb
    )
  });
}
