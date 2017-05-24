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

var srcDir = './src';
var destDir = './static';

gulp.task('clean', function () {
    return del([
      destDir + '/**/*',
      '!' + destDir + '/.gitkeep'
    ])
});

gulp.task('sass:dev', ['copy'], function() {
    var sassStream = gulp.src(srcDir + '/styles/scss/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}));

    var cssStream = gulp.src(srcDir + '/styles/vendor/*.css')
        .pipe(concat('css-files.css'));

    var mergedStream = merge(sassStream, cssStream)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(destDir + '/styles'));
    return mergedStream;
});

var jsLibsBase = srcDir + '/scripts/vendor/';

gulp.task('js', function() {
    // TODO: update this to run uglify on main js as well (and remove it from copy)
    // TODO: check if js files not listed here can be deleted
    gulp.src([jsLibsBase + 'jquery-3.1.0.min.js', jsLibsBase + 'lunrjs.min.js', jsLibsBase + 'highlight.pack.js', jsLibsBase + 'debounce.min.js', jsLibsBase + 'clipboard.min.js', jsLibsBase + 'version.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(destDir + '/scripts/'));
});

var copySrc = [
    srcDir + '/fonts/**/*',
    srcDir + '/images/**/*',
    srcDir + '/scripts/app.js',
    // srcDir + '/scripts/application.js' // not sure why there are two files...
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

gulp.task('build:prod', ['hugo', 'set-base:production', 'js']);
gulp.task('build:dev', ['hugo', 'set-base:development', 'js']);
