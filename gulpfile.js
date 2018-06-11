var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');
  var minify = require('gulp-minify-css');
  var purify = require('gulp-purifycss');

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop'
]);

//script paths
var jquery = 'public/js/core/jquery.3.2.1.min.js',
    popper = 'public/js/plugins/popper.min.js',
    lazy = 'public/js/plugins/jquery.lazyload.min.js',
    bootstrap = 'public/js/core/bootstrap.min.js',
    tether = 'public/js/core/tether.min.js',
    DatePicker = 'public/js/plugins/bootstrap-datepicker.js',
    bsSwitch = 'public/js/plugins/bootstrap-switch.js',
    slider = 'public/js/plugins/nouislider.min.js',
    jsDest = 'public/js/dist/';

gulp.task('scripts', function() {
    return gulp.src([jquery, ,popper, lazy, tether, bootstrap, DatePicker, bsSwitch, slider])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));

});

gulp.task('css', function() {
    return gulp.src(['public/css/bootstrap.min.css', 'public/css/demo.css', 'public/css/now-ui-kit.css'])
        .pipe(minify())
        .pipe(concat('dist.css'))
        .pipe(purify(['views/index.html']))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css/'));

});
