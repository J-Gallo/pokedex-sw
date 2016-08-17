var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    del         = require('del'); // rm -rf
    uglify      = require('gulp-uglify'),
    nodemon     = require('gulp-nodemon'),
    fs          = require('fs'),
    sourcemaps  = require('gulp-sourcemaps'),
    sass        = require('gulp-sass');

gulp.task('delete', function() {
    return del.sync(['statics']);
});

gulp.task('server', function () {
    var env = process.env.APP_ENV || 'dev';
    if (env == 'dev') {
        nodemon({
            watch: './',
            ext: 'js css hbs',
            env: { 'NODE_ENV': 'development' }
        })
    }
});

gulp.task('sass', function () {
    fs.readFile('APP_VERSION', 'utf8', function (err , data) {
        return gulp.src('./src/stylesheets/style.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('./statics/'+ data.trim() + '/stylesheets/'));
    });
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('scripts', function () {
    fs.readFile('APP_VERSION', 'utf8', function (err , data) {
        var js = ['./src/js/*.js'];

        return gulp.src(js)
            .pipe(concat('internal.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('statics/' + data.trim() +'/js/'));
    })
});

gulp.task('scripts:watch', function () {
    gulp.watch(['./src/js/*.js'], ['scripts']);
});

gulp.task('copyImages', function() {
    fs.readFile('APP_VERSION', 'utf8', function (err , data) {

        return gulp.src('./src/img/**/*')
            .pipe(gulp.dest('statics/' +  data.trim() +'/images'));
    });

});

gulp.task('copyFonts', function() {
    fs.readFile('APP_VERSION', 'utf8', function (err , data) {

        return gulp.src('./src/fonts/**/*')
            .pipe(gulp.dest('statics/' + data.trim() +'/fonts'));
    });
});

gulp.task('build', ['delete', 'copyImages', 'copyFonts', 'sass', 'scripts']);

gulp.task('default', ['build', 'sass:watch', 'scripts:watch', 'server']);
