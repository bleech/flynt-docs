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

var srcDir = './src';
var destDir = './static';

gulp.task('clean', function () {
    return del([
      destDir + '/**/*',
      '!' + destDir + '/.gitkeep'
    ])
});

gulp.task('sass:dev', ['uglify'], function() {
    var sassStream = gulp.src(srcDir + '/styles/scss/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}));

    var cssStream = gulp.src(srcDir + '/styles/vendor/*.css')
        .pipe(concat('css-files.css'));

    var mergedStream = streamqueue({ objectMode: true }, cssStream, sassStream)
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(destDir + '/styles'));
    return mergedStream;
});

gulp.task('uglify', ['copy'], function (cb) {
    pump([
            gulp.src(srcDir + '/scripts/**/*.js', { base: srcDir }),
            uglify(),
            gulp.dest(destDir)
        ],
        cb
    );
})

var copySrc = [
    srcDir + '/fonts/**/*',
    srcDir + '/images/**/*'
];

// TODO: check if clean task is really necessary
gulp.task('copy', ['clean'], function () {
    gulp.src(copySrc, { base: srcDir })
        .pipe(gulp.dest(destDir))
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

gulp.task('build-search-index',['sass:dev'], shell.task(['node ./buildSearchIndex.js']));
gulp.task('hugo', ['sass:dev', 'build-search-index'], shell.task(['hugo']));

gulp.task('build:prod', ['hugo', 'set-base:production']);
gulp.task('build:dev', ['hugo', 'set-base:development']);
