const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const gulp = require('gulp')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const streamqueue = require('streamqueue')

// TODO: do not concatenate
// TODO: have a nicer way to include vendor css
module.exports = function (config) {
  gulp.task('sass', function() {
    const sassStream = gulp.src(config.sass)
      .pipe(sassGlob())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({cascade: false}));

    const cssStream = gulp.src(config.css)
      .pipe(concat('css-files.css'));

    const mergedStream = streamqueue({ objectMode: true }, cssStream, sassStream)
      .pipe(concat('style.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(config.dest + '/styles'));
    
    return mergedStream
  });
}
