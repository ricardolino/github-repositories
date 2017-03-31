var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var browserSync = require('browser-sync').create();

var reload = browserSync.reload;
var stream = browserSync.stream;


var sourcePath = './source/';
var pkg = {
      src: {
              base: sourcePath
            , baseHTML: sourcePath + 'index.html'
            , sass: sourcePath + 'sass/**/*.sass'
            , modulesSass: sourcePath + 'apps/**/*.sass'
            , js: sourcePath + 'apps/**/!(*.specs).js'
            , angularModules: sourcePath + 'apps/**/*.module.js'
            , angularTemplates: sourcePath + 'apps/**/*.html'
            , images: sourcePath + 'images/**/*'
        }
    , dest: './public/'
};

gulp.task('default', [
      'build'
    , 'serve'
    , 'watch'
]);

gulp.task('build', [
      'sass'
    , 'baseHTML'
    , 'htmls'
    , 'scripts'
    , 'images'
]);

/**
 * Run sass
 */
gulp.task('sass', function (done) {
    gulp.src([
            pkg.src.modulesSass
            , pkg.src.base + 'sass/bundle.sass'
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
        .pipe(concat('bundle.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pkg.dest + 'styles/'))
        .on('end', done)
        .pipe(stream());
});

/**
 * Handle all JS compilation stuff
 */

gulp.task('htmls', function () {
    gulp.src(pkg.src.angularTemplates)
        .pipe(gulp.dest(pkg.dest + 'apps/'))
        .pipe(stream());
})

gulp.task('scripts', function () {
    gulp.src([
              pkg.src.angularModules
            , pkg.src.js
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(jscs({
            fix: false
            , configPath: '.jscsrc'
        }))
        .pipe(jscs.reporter())
        .pipe(jscs({
            fix: true
            , configPath: '.jscsrc-build'
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('bundle.min.js', {newLine: ';'}))
        .pipe(ngAnnotate({ add: true }))
        // .pipe(bytediff.start())
        // .pipe(uglify({mangle: true}))
        // .pipe(bytediff.stop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pkg.dest + 'scripts/'))
        .pipe(stream());
});

/**
 * Copy baseHTML
 */
gulp.task('baseHTML', function () {
    gulp.src(pkg.src.baseHTML)
        .pipe(gulp.dest(pkg.dest))
        .pipe(stream());
});

/**
 * Copy images
 */
gulp.task('images', function () {
    gulp.src(pkg.src.images)
        .pipe(gulp.dest(pkg.dest + 'images/'))
        .pipe(stream());
});

// Static server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "public/"
        }
    });
});

/**
 * Watch files for recompilation
 */
gulp.task('watch', function () {
    gulp.watch([pkg.src.sass, pkg.src.modulesSass], ['sass']).on('change', reload);
    gulp.watch([pkg.src.js],                        ['scripts']).on('change', reload);
    gulp.watch([pkg.src.angularTemplates],          ['htmls']).on('change', reload);
    gulp.watch([pkg.src.baseHTML],                  ['baseHTML']).on('change', reload);
    gulp.watch([pkg.src.images],                    ['images']).on('change', reload);
});