'use strict';

// Подключение плагинов
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    path = {
        src: {
            root: './src/',
            sass: './src/sass/',
            css: './src/css/',
            js: './src/js/',
            img: './src/img/',
            html: 'src/*'
        }
    };

// Перезагрузка браузера //
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: path.src.root
        }
    });
    
})

/// <<<DEVELOP>>> ///

// Компиляция SASS //
gulp.task('sass2css', function() {
    return gulp.src(path.src.sass + '*.sass')
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
    }))
    .pipe(gulp.dest(path.src.css));
})
// Компиляция с JS //
gulp.task('jsbuild',function() {
    return gulp.src(path.src.js + '**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest(path.src.js));
})
// Слежение за элементами //
gulp.task('watch', function(){
    gulp.watch([path.src.sass + '**/*.sass'], ['sass2css']);
    gulp.watch(path.src.css + '**/*.css').on("change", browserSync.reload);
    gulp.watch(path.src.html + '*.html').on("change", browserSync.reload);
    gulp.watch([path.src.js + '**/*.js'], ['jsbuild']).on("change", browserSync.reload);
})

/// <<<PRODUCTION>>> ///

gulp.task('build:html', function(){
    return gulp.src(path.src.html + '*.html')
    .pipe(gulp.dest('production/'));
})

gulp.task('copylib', function(){
    return gulp.src('src/lib/*.*')
    .pipe(gulp.dest('production/lib/'));
})

// Сборка JS//
gulp.task('build:js', function(){
    return gulp.src(path.src.js + 'app.js')
    .pipe(uglify())
    .pipe(gulp.dest('production/js/'));
})

// Сборка CSS//
gulp.task('build:css', function(){
    return gulp.src(path.src.css + 'style.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('production/css/'));
})

// Минификация Картинок //
gulp.task('build:img', function(){
    return gulp.src(path.src.img + '*')
    .pipe(imagemin())
    .pipe(gulp.dest('production/img/'));
})

gulp.task('default', ['server', 'watch']);
gulp.task('build', ['build:js', 'build:css', 'build:html', 'build:img', 'copylib']);