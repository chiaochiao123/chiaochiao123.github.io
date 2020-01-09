var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// var browserSync = require('browser-sync');
// var pug = require('gulp-pug');
// var sass = require('gulp-sass');
// var plumber = require('gulp-plumber');
// var postcss = require('gulp-postcss');
// var jsonServer = require("gulp-json-srv");
// var server = jsonServer.create();

gulp.task('copyHTML', function () {
  return gulp.src('./source/**/*.html')
    .pipe(gulp.dest('./public/'))
})

gulp.task('pug', function () {
  // var YOUR_LOCALS = {};
  gulp.src('./source/*.pug')
    .pipe($.plumber())
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public'))
});

gulp.task('sass', function () {
  return gulp.src('./source/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    //編譯完成
    .pipe(gulp.dest('./public/css'));

});


// gulp.task("start", function () {
//   return gulp.src("db.json")
//     .pipe(server.pipe());
// });

gulp.task('watch', function () {
  gulp.watch('./source/scss/**/*.scss', ['sass']);
  gulp.watch('./source/helpers/**/*.scss', ['sass']);
  gulp.watch('./source/**/*.pug', ['pug']);
});

gulp.task('deploy', function () {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

// gulp.task('browserSync', function () {
//     browserSync.init({
//       server: { baseDir: './public' },
//       reloadDebounce: 5500
//     })
//   });

gulp.task('default', ['sass', 'pug', 'watch'])