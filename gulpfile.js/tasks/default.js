const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('default', function (cb) {
  runSequence(
    'clean',
    ['copy', 'sass', 'uglify', 'setBase:development', 'buildSearchIndex'],
    'watch',
    cb
  );
});
