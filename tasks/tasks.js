/**
 *
 * CSS プリコンパイル用 gulp定義
 * 
 * @author yanahiro
 * @version 1.0
 * 
 */

var gulp = require('gulp');

// style系のライブラリ
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var sourcemaps = require('gulp-sourcemaps');


/**
 * css コンパイル用関数
 */
gulp.task('scss', function() {
  var processors = [
      cssnext({browsers: 'last 10 versions' // last 2 versions,  '> 0%'
    })
  ];
  return gulp.src('./resources/scss/style.scss')
      .pipe(sass({
        outputStyle : 'expanded'
      }))
      .pipe(postcss(processors))
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/css'));
});

gulp.task("watch", function() {  
  var targets = [
    './resources/scss/**'
  ];
  // gulp.watch(targets, ['scss']);
  gulp.watch(targets, gulp.series('scss'));
});

// js系ライブラリ
var babel = require('gulp-babel');

// javascript 圧縮用ライブラリ
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');



/**
 * リテラル設定情報
 * @type {String}
 */
var jspath = 'resources/js';

/**
 * 共通系JS処理を結合する
 * @type {Array}
 */
var files = [
  jspath + '/common.js',
  jspath + '/barba.js',
  jspath + '/canvasbase.js',
  jspath + '/streamlines.js',
];
gulp.task('js', function() {
  return gulp.src(files)
    .pipe(babel())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

var indexfiles = [
  jspath + '/indexAnime.js',
  jspath + '/app-motion.js',
  jspath + '/index.js',
];
gulp.task('js-in', function() {
  return gulp.src(indexfiles)
    .pipe(babel())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

var indexSpfiles = [
  jspath + '/indexAnime.js',
  jspath + '/app-motionsp.js',
  jspath + '/index.js',
];
gulp.task('js-insp', function() {
  return gulp.src(indexSpfiles)
    .pipe(babel())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('indexsp.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

// var appfiles = [
//   jspath + '/app-motion.js',
// ];
// gulp.task('js-app', function() {
//   return gulp.src(appfiles)
//     .pipe(babel())
//     .pipe(plumber())
//     .pipe(sourcemaps.init())
//     .pipe(concat('app-motion.js'))
//     .pipe(uglify())
//     .pipe(rename({extname: '.min.js'}))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('public/js'));
// });

// var appspfiles = [
//   jspath + '/app-motionsp.js',
// ];
// gulp.task('js-appsp', function() {
//   return gulp.src(appspfiles)
//     .pipe(babel())
//     .pipe(plumber())
//     .pipe(sourcemaps.init())
//     .pipe(concat('app-motionsp.js'))
//     .pipe(uglify())
//     .pipe(rename({extname: '.min.js'}))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('public/js'));
// });

// gulp.task('js.all', ['js', 'js-in', 'js-app', 'js-appsp']);
// gulp.task('js.all', gulp.series('js', 'js-in', 'js-app', 'js-appsp', (complete) => {
gulp.task('js.all', gulp.series('js', 'js-in', 'js-insp', (complete) => {
  complete();
}));


// var stfiles = [
//   jspath + '/streamlines.js',
// ];
// gulp.task('js-st', function() {
//   return gulp.src(stfiles)
//     .pipe(babel())
//     .pipe(plumber())
//     .pipe(sourcemaps.init())
//     .pipe(concat('streamlines.js'))
//     .pipe(uglify())
//     .pipe(rename({extname: '.min.js'}))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('public/js'));
// });

