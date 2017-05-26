const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const gulp = require('gulp')
const sass = require('gulp-sass')
const streamqueue = require('streamqueue')

module.exports = function (config) {
  gulp.task('sass', function() {
    const sassStream = gulp.src(config.src + '/styles/scss/style.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({cascade: false}));

    const cssStream = gulp.src(config.src + '/styles/vendor/*.css')
      .pipe(concat('css-files.css'));

    const mergedStream = streamqueue({ objectMode: true }, cssStream, sassStream)
      .pipe(concat('style.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(config.dest + '/styles'));
    
    return mergedStream
  });
}
