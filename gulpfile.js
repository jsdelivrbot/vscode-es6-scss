var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var babel = require('gulp-babel');
var fs = require('fs');
let cleanCSS = require('gulp-clean-css');
 

gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
          cascade: false
        }))
        .pipe(gulp.dest("dest/compiled"))
        .pipe(gulp.dest("style"))
});

gulp.task('minify-css', () => {
  return gulp.src('dest/compiled/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dest/minify'));
});

gulp.task('es6', function() {
  return gulp.src('src/es6/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dest/js'))
        .pipe(gulp.dest("js"))
});

gulp.task('watch', function(){
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/es6/*.js', ['es6']);
  gulp.watch('src/scss/*.scss', ['minify-css']);
});

gulp.task('default', ['sass'], function() {
    gulp.watch('src/scss/*.scss', ['sass'])
});

gulp.task('default', ['es6'], function() {
  gulp.watch('src/es6/*.js', ['es6'])
});