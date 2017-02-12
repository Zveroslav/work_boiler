'use strict';

// Подключение плагинов
var gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    copy = require('gulp-contrib-copy'),
    preprocess = require('gulp-preprocess'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

// Пути для сборки
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('dev', ['serve']);
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });

    gulp.watch('src/css/*.css').on("change", browserSync.reload);
});