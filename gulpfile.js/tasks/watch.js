const fs = require('fs')
const gulp = require('gulp')
const path = require('path')
const watch = require('gulp-watch')

function watchAndDelete (src, callback, dest) {
  return watch(src, {
    events: ['add', 'change', 'unlink', 'unlinkDir']
  }, callback)
  .on('data', function (file) {
    if (file.event === 'unlink') {
      const filePath = path.join(dest, file.relative)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      if (extensionMappings[file.extname]) {
        const relativeDest = path.dirname(filePath)
        const mappedFilePath = path.join(relativeDest, file.stem + extensionMappings[file.extname])
        if (fs.existsSync(mappedFilePath)) {
          fs.unlinkSync(mappedFilePath)
        }
      }
    }
    if (file.event === 'unlinkDir') {
      const dirPath = path.join(dest, file.relative)
      if (fs.existsSync(dirPath)) {
        fs.rmdirSync(dirPath)
      }
    }
  })
}

module.exports = function (config) {
  gulp.task('watch', function (cb) {
    watchAndDelete(config.copy, function () { gulp.start('copy') }, config.dest)
    watch(config.sass, function () { gulp.start('sass') })
    watch(config.uglify, function () { gulp.start('uglify') })
    cb()
  });
}
