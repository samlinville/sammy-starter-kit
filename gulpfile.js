const gulp = require('gulp');
const sass = require('gulp-sass');
const purify = require('gulp-purifycss');
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css');
const htmlValidator = require('gulp-w3c-html-validator');
const browserSync = require('browser-sync').create();
//compile scss into css
function style() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(rename('sammy.css'))
    .pipe(gulp.dest('static/css'))
    .pipe(browserSync.stream());
}

function minify() {
    return gulp.src('static/css/sammy.css')
    // .pipe(purify(['./*.html']))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(rename('sammy.min.css'))
    .pipe(gulp.dest('static/css'));
}

function validate() {
    return gulp.src('./*.html')
    .pipe(htmlValidator())
    .pipe(htmlValidator.reporter());
}


function watch() {
    browserSync.init({
        server: {
           baseDir: "./",
           index: "./index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', style)
    gulp.watch('static/css/sammy.css', minify)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.minify = minify;
exports.watch = watch;
exports.validate = validate;