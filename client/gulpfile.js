var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var filelist = require('gulp-filelist');
var minifyCss = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');
var filter = require('gulp-filter');
var replace = require('gulp-replace');
var order = require("gulp-order");
var gzip = require('gulp-gzip');
var ngHtml2Js = require("gulp-ng-html2js");
var runSequence = require('run-sequence');

gulp.task('concat_js', function() {
    return gulp.src(scripts.concat(['dist/templates/templates.html.js']))
        .pipe(concat('ekasud.core.min.js'))
        .pipe(uglify())
        //.pipe(gzip({ extension: 'gzip' }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('concat_css', function() {
    return gulp.src(css)
        .pipe(concat('ekasud.style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html2js', function() {
    return gulp.src("./ekasud/**/*.html")
        .pipe(ngHtml2Js({
            moduleName: "ekasud.core",
            prefix: "ekasud/"
        }))
        .pipe(concat("templates.html.js"))
        .pipe(gulp.dest("./dist/templates"));
});

gulp.task('watch', function () {
    watch(scripts, function () {
        gulp.start('concat_js');
    });

    watch(css, function () {
        gulp.start('concat_css');
    });
});

gulp.task('main_bower_files', function() {
    return gulp.src(mainBowerFiles())
        .pipe(filter('**.js'))
        .pipe(concat('bower_lib.js'))
        .pipe(gulp.dest('dist/bower'));
});

gulp.task('file_list', function() {
    return gulp
        .src(scripts)
        .pipe(filelist('scripts.js'))
        .pipe(replace(/\[/g, 'var scripts = ['))
        .pipe(gulp.dest('dist'))
});

gulp.task('build', function(callback) {
    runSequence(
        'main_bower_files',
        'html2js',
        'concat_js',
        'concat_css',
        callback
    );
});

gulp.task('default', ['concat_css', 'concat_js']);
