var concat 	= require('gulp-concat'),
	uglify	= require('gulp-uglify'),
	rename	= require('gulp-rename'),
	jsFiles	= './src/js/*.js',
	cssFiles= './src/css/*.css';

gulp.task('build:js', function() {
	return gulp.src(jsFiles)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(rename('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('build:css', function() {
	return gulp.src(cssFiles)
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('styles.min.css'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build:css', 'build:js']);