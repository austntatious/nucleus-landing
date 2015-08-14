var gulp = require('gulp'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),

  paths = {
    scripts: './assets/js/**/*.js',
    styles: './assets/css/**/*.css'
  };

gulp.task('css', function () {
  gulp.src([
    './assets/plugins/bootstrap/css/bootstrap.min.css',
    './assets/plugins/font-awesome/css/font-awesome.css',
    './assets/plugins/flexslider/flexslider.css',
    './assets/css/styles.css'
  ])
    .pipe(concat('total.css'))
    .pipe(gulp.dest('./compiled'));
});

gulp.task('fonts', function () {
  gulp.src('./assets/plugins/font-awesome/fonts/**/*.{ttf,woff,eof,svg,woff2}')
    .pipe(gulp.dest('./fonts'))
})

gulp.task('js', function () {
  gulp.src([
    './assets/plugins/jquery-1.11.2.min.js',
    './assets/plugins/jquery-migrate-1.2.1.min.js',
    './assets/plugins/bootstrap/js/bootstrap.min.js',
    './assets/plugins/bootstrap-hover-dropdown.min.js',
    './assets/plugins/back-to-top.js',
    './assets/plugins/jquery-placeholder/jquery.placeholder.js',
    './assets/plugins/FitVids/jquery.fitvids.js',
    './assets/plugins/flexslider/jquery.flexslider-min.js',
    './assets/js/main.js',
    './assets/js/vimeo.js',
    './assets/plugins/jquery.form.js',
    './assets/js/contact_form.js'
  ])
    .pipe(concat('total.js'))
    .pipe(gulp.dest('./compiled'));
});

gulp.task('watch', function () {
  gulp.watch(paths.styles, ['css']);
  gulp.watch(paths.scripts, ['js']);
});

gulp.task('images', function () {
  return gulp.src('./assets/images/**/*.{png,jpg,gif}')
    .pipe(imagemin({
        progressive: false,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./images'));
});

gulp.task('default', ['watch', 'fonts', 'js', 'css', 'images']);