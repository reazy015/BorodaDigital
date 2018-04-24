const gulp = require('gulp');
const sass = require('gulp-sass');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const pug = require('gulp-pug');

gulp.task('style', function () {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});

gulp.task('sprite', function () {
  return gulp.src('img/icons/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio(function ($) {
      $("style").remove()
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('img/sprite'));
});

gulp.task('pug', function () {
  return gulp.src('./pug/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
    .pipe(server.stream());
});

gulp.task('serve', ['style', 'pug'], function () {
  server.init({
    server: '.'
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('pug/**/*.pug', ['pug']);
});

