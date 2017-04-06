var gulp = require('gulp'),
sass = require('gulp-sass'),
uglify = require('gulp-uglify');
connect = require('gulp-connect');
//create and compress css from scss
gulp.task('sass', function() {
  return gulp.src('./static/src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./static/dist/css'));
});
//compress js file
gulp.task('minifyjs', function() {
  return gulp.src('./static/src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./static/dist/js'));
});
gulp.task('reload_sass', function () {
	gulp.src('./static/src/scss/*.scss')
		.pipe(connect.reload());
});
gulp.task('watch', function () {   	
	gulp.watch('./static/src/js/*.js', ['minifyjs']);
    gulp.watch('./static/src/scss/*.scss', ['sass']);
    gulp.watch(['./static/src/scss/*.scss'], ['reload_sass']);
});

gulp.task('default', ['sass','minifyjs','watch']);