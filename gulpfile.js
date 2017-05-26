var gulp  = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var shell = require('gulp-shell');
var merge = require('merge-stream');
var concat = require('gulp-concat')
var env = require('./env.json');
var inject = require('gulp-inject-string');
var fs = require('fs');
var del = require('del');
var streamqueue = require('streamqueue');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

var srcDir = './src';
var config = {
    'src': srcDir,
    'dest': './static',
    'sass': [
        srcDir + '/styles/sass/**/*.sass',
        '!' + srcDir + '/styles/sass/**/_*.sass'
    ],
    'uglify': [
        srcDir + '/scripts/**/*.js'
    ],
    'copy': [
        srcDir + '/fonts/**/*',
        srcDir + '/images/**/*'
    ]
};

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

gulp.task('clean', function () {
    return del([
      config.dest + '/**/*',
      '!' + config.dest + '/.gitkeep'
    ])
});

gulp.task('sass', function() {
    var sassStream = gulp.src(config.src + '/styles/scss/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}));

    var cssStream = gulp.src(config.src + '/styles/vendor/*.css')
        .pipe(concat('css-files.css'));

    var mergedStream = streamqueue({ objectMode: true }, cssStream, sassStream)
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.dest + '/styles'));
    return mergedStream;
});

gulp.task('uglify', function (cb) {
    pump([
            gulp.src(config.uglify, { base: config.src }),
            uglify(),
            gulp.dest(config.dest)
        ],
        cb
    );
})

gulp.task('copy', function () {
    gulp.src(config.copy, { base: config.src })
        .pipe(gulp.dest(config.dest))
})

var developmentBase = '\n<script type="text/javascript">';
developmentBase +='\ntheBaseUrl = "http://" + location.host + "/";';
developmentBase +='\ndocument.write(\'<base href="\' + theBaseUrl + \'"/>\');';
developmentBase +='\n</script>';

var prodUrl = env.prod.baseUrl;

var productionBase = '\n<script type="text/javascript">';
productionBase +='\ntheBaseUrl = "'+ prodUrl + '";';
productionBase +='\n</script>';

gulp.task('set-base:development', [], function() {
    fs.writeFileSync('./layouts/partials/base-url.html', developmentBase);
});

gulp.task('set-base:production', [], function() {
    fs.writeFileSync('./layouts/partials/base-url.html', '\n'+productionBase+'\n<base href="'+ prodUrl + '" />');
});

gulp.task('build-search-index', shell.task(['node ./buildSearchIndex.js']));

gulp.task('hugo', shell.task(['hugo']));

gulp.task('watch', function () {
    watchAndDelete(config.copy, function () { gulp.start('copy') }, config.dest)
    watch(config.sass, function () { gulp.start('sass') })
    watch(config.uglify, function () { gulp.start('uglify') })
});

gulp.task('default', function (cb) {
    runSequence(
        'clean',
        ['copy', 'sass', 'uglify', 'set-base:development', 'build-search-index'],
        'watch',
        cb
    );
});

gulp.task('build', function (cb) {
    runSequence(
        'clean',
        ['copy', 'sass', 'uglify', 'set-base:production', 'build-search-index'],
        'hugo',
        cb
    )
});
