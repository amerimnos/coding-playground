'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const purify = require('gulp-purifycss');
const xto6 = require('gulp-xto6');


/**
 * @description dist 폴더 제거
 */
const clean = () => {
    return del('./dist');
};

/**
 * @description 모든 파일과 폴더를 dist 폴더로 복사(!파일 제외)
 */
const copyFiles = () => {
    return gulp
        .src([
            './**/*',
            '!node_modules/**',
            '!gulpfile.js',
            '!package-lock.json',
            '!package.json',
            '!gitignore.json'
        ])
        .pipe(gulp.dest('./dist'));
};

/**
 * @description CSS 축소화
 */
const css = () => {
    return gulp
        .src('./dist/css/**/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/css/'))
};

/**
 * @description CSS tree shaking
 * @TODO 작동되지 않아 확인 필요
 */
const purifyCss = () => {
    return gulp
        .src('./dist/css/style.css')
        .pipe(purify(['./dist/js/**/*.js', './dist/**/*.html']))
        .pipe(gulp.dest('./dist'));
};


/**
 * @description JS es5->es6 변환/난독화/축소화/tree shaking
 */
const js = () => {
    return gulp.src('./dist/js/**/*.js')
        //.pipe(xto6()) TODO : es5를 es6로 변한할 필요가 있을까?
        .pipe(uglify()) // TODO : 기본 옵션으로 tree shaking 관련 코드가 활성화되어 있으나 정적 분석을 지원하지 않아서인지 작동하지 않음.
        .pipe(gulp.dest('./dist/js/'));
};




/*
-------------------------------------------------------------------
# Execute Tasks
-------------------------------------------------------------------
*/
const build = gulp.series(
    clean,
    copyFiles,
    gulp.parallel(css, js),
    purifyCss
);

gulp.task('build', build);
