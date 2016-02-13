var gulp 		= require('gulp'),
	concat 		= require('gulp-concat'),
	uglifyJs	= require('gulp-uglify'),
	uglifyCss	= require('gulp-uglifycss'),
	rename		= require('gulp-rename'),
	gulpUtil 	= require('gulp-util');

gulp.task('build:js', function() {
	return gulp.src('./src/js/*.js')
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(uglify().on('error', gulpUtil.log))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('build:css', function() {
	return gulp.src('./src/css/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglifyCss().on('error', gulpUtil.log))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build:css', 'build:js']);