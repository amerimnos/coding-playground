'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const purify = require('gulp-purifycss');
const del = require('del');
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
 */
const purgeCss = () => {
    return gulp
        .src('./dist/css/**/*.css')
        .pipe(purgecss({
            content: ['./dist/**/*.html']
        }))
        .pipe(gulp.dest('./dist/css/'))
};

/**
 * @description CSS tree shaking
 * @TODO 실행되지만 적용안되는 문제
 */
const purifyCss = () => {
    return gulp
        .src('./dist/**/*.css')
        .pipe(purify(['./dist/js/**/*.js', './dist/**/*.html']))
        .pipe(gulp.dest('./dist'));
};



/**
 * @description JS 변환(ES5->ES6)/난독화/축소화/최적화
 * 최적화 관련하여, uglify를 통해서 약소하게 가능함. 드라마틱한 최적화를 위해서는 걸프 대신 웹펙이나 rollup을 사용하여 tree shaking을 적용해야함.
 * 
 * 관련 근거 :
 * https://gist.github.com/vreality64/96a57ba698d5b44c35c7714ae8947863#rollupjs
 * https://www.phind.com/search?cache=8d0f20c8-61ad-4e73-9ae1-a91af384e41f
 */
const js = () => {
    return gulp
        .src('./dist/js/**/*.js')
        //.pipe(xto6()) TODO : 작동은 하지만 업데이트 안 된지 오래됨. 변한 작업할 필요가 있을까?
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
    purgeCss
    //purifyCss
);

gulp.task('build', build);
