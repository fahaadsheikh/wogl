// Defining source pathes
var sourcePaths = {
    parent: './wg_gassets/**/*',
    js: './wg_gassets/js/',
    scss: './wg_gassets/sass/',
    normalize : './wg_gassets/sass/inc/_normalize.scss',
    images: './wg_gassets/images/*'
};

// Defining destination pathes
var destinationPaths = {
    js: './wg_assets/js/',
    css: './wg_assets/css/',
    images: './wg_assets/images/'
};


// Defining requirements

// Require gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Clean Gulp SCSS
var cleanCSS = require('gulp-clean-css');
// CSS Nano
var cssnano = require('gulp-cssnano');
// CSSO
var csso = require('gulp-csso');
// Concatinate src files
var concat = require('gulp-concat');
// Minify JS
var uglify = require('gulp-uglify');
// Minify Images
var imagemin = require('gulp-imagemin');
// Gulp Watch
var watch = require('gulp-watch');
// Gulp Sequence
var runSequence = require('gulp-sequence');
// Gulp Cache
var cache = require('gulp-cache');



// Generate DEV CSS Files
gulp.task('sass', function(){
  return gulp.src([sourcePaths.normalize, sourcePaths.scss + 'variables.scss', sourcePaths.scss + 'wogl.scss'])
    .pipe(concat('wogl.scss'))
    .pipe(sass().on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(destinationPaths.css))
});

// Generate MIN CSS Files
gulp.task('sass-minify', function(){
  return gulp.src([sourcePaths.normalize, sourcePaths.scss + 'variables.scss', sourcePaths.scss + 'wogl.scss'])
    .pipe(concat('wogl.min.scss'))
    .pipe(sass().on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(cssnano())
    .pipe(csso())
    .pipe(gulp.dest(destinationPaths.css))
});

// Generate DEV JS Files
gulp.task('js', function(){
  return gulp.src([sourcePaths.js + 'wogl.js'])
    .pipe(uglify()) // Converts Sass to CSS with gulp-sass
    .pipe(concat('wogl.js'))
    .pipe(gulp.dest(destinationPaths.js))
});


// Generate MIN JS Files
gulp.task('js-minify', function(){
  return gulp.src([sourcePaths.js + 'wogl.js'])
    .pipe(uglify()) // Converts Sass to CSS with gulp-sass
    .pipe(concat('wogl.min.js'))
    .pipe(gulp.dest(destinationPaths.js))
});

// Generate MIN Images
gulp.task('image-min', function(){
  return gulp.src([sourcePaths.images])
      .pipe( cache( imagemin() ) )
      .pipe(gulp.dest(destinationPaths.images))
});

gulp.task('task-sequence', function(callback) {
  runSequence('sass', 'sass-minify', 'js', 'js-minify', 'image-min', callback);
});


// Watch
gulp.task('watch', function(){
  gulp.watch(sourcePaths.parent, ['task-sequence']); 
  // Other watchers
})