var gulp = require("gulp");
var watch = require("gulp-watch");
var sass = require("gulp-sass");
var minify = require("gulp-minify-css");
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
    return gulp.src('assets/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('postcss', function() {
    return gulp.src('assets/css/*.css')
        .pipe(autoprefixer({
            remove: false,
            browsers: ["> 1%"]
        }))
        .pipe(minify())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('full-sass', function(done) {
    runSequence('sass', 'postcss', function() {
        done();
    });
});

gulp.task('watch-sass', function(done) {
    return gulp.watch('assets/sass/main.scss', ['full-sass']);
});

gulp.task('watch', ['watch-sass']);

gulp.task('default', ['watch']);
