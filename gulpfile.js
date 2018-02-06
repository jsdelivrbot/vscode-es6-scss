var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var babel = require('gulp-babel');

gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
          cascade: false
        }))
        .pipe(gulp.dest("dest/css"))
        // .pipe(gulp.dest("../css")) //←任意の場所にcssを出力
});

gulp.task('es6', function() {
  return gulp.src('src/es6/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dest/js'))
        // .pipe(gulp.dest("../js")) //←任意の場所にjsを出力
});

gulp.task('watch', function(){
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/es6/*.js', ['es6']);
});

gulp.task('default', ['sass'], function() {
    gulp.watch('src/scss/*.scss', ['sass'])
});

gulp.task('default', ['es6'], function() {
  gulp.watch('src/es6/*.js', ['es6'])
});