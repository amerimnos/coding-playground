'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const xto6 = require('gulp-xto6');


/**
 * @description dist 폴더 제거
 */
const clean = () => {
    return del('./dist');
};

/**
 * @description 모든 파일과 폴더를 dist 폴더로 복사
 */
const copyFiles = () => {
    return gulp.src([
        './**/*',
        '!node_modules/**',
        '!gulpfile.js',
        '!package-lock.json',
        '!package.json',
        '!gitignore.json'
    ])
        .pipe(gulp.dest('dist'));
};

/**
 * @description CSS 축소화/tree shaking
 */
const css = () => {
    return gulp
        .src('./dist/css/**/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/css/'))
};

/**
 * @description JS es5->es6 변환/난독화/축소화/tree shaking
 */
const js = () => {
    return gulp.src('./dist/js/**/*.js')
        //.pipe(xto6()) TODO : 굳이 es5를 es6로 변한할 필요가 있을까? xtos는 작동하나 관리가 오랬동안 안되고 있음.
        .pipe(uglify()) // TODO : 기본 옵션으로 tree shaking 같은 코드가 활성화되어 있으나 웹팩 같은 환경이 아니기 때문에 잘 적용은 안되는 것으로 보임.
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
    gulp.parallel(css, js)
);

gulp.task('build', build);
