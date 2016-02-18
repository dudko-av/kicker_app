var gulp = require('gulp');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var watch = require('gulp-watch');
var filelist = require('gulp-filelist');
//var minifyCss = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
//var bowerNormalizer = require('gulp-bower-normalize');
//var filter = require('gulp-filter');
var replace = require('gulp-replace');
//var order = require("gulp-order");
//var gzip = require('gulp-gzip');
//var ngHtml2Js = require("gulp-ng-html2js");
//var runSequence = require('run-sequence');
var fs = require('fs');
var htmlreplace = require('gulp-html-replace');
var filenames = require("gulp-filenames");
var recursive = require('recursive-readdir');
var rename = require("gulp-rename");

function getRelativePath(arr) {
    return arr.map(function (item) {
        return item.replace(__dirname + '\\', '').replace(__dirname + '/', '').replace(/\\/g, '/');
    });
}

var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        }
        else {
            if (file.indexOf('.js') > -1)
                filelist.push(dir + '/' + file);
        }
    });
    return filelist;
};

// include_files
gulp.task('inc', function() {
    console.log(walkSync('app'));

    gulp.src('index.dev.html')
        .pipe(htmlreplace({
            'css': getRelativePath(mainBowerFiles('**/*.css')),
            'js': getRelativePath(mainBowerFiles('**/*.js').concat(walkSync('app').reverse()))
        }))
        .pipe(rename('./index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('fl', function() {
    gulp
        .src(['app/**/*.js'])
        .pipe(require('gulp-filelist')('filelist.json'))
        .pipe(gulp.dest('out'))
});
