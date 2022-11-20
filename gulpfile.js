const { src, dest, lastRun, watch } = require('gulp');

// # 방법 1. 수정한 파일만 확인 하기 때문에 속도도 빠르고 버벅임이 없어질 수 있음.
function html() {
    return src('src/*.html', { since: lastRun(html) })
        .pipe(dest('dist'));
}

// # 방법 2. 파일 저장할 때 마다 모든 파일을 검사하기 때문에 속도가 느리고 버벅일 수 있음.
/* function html() {
    return src('src/*.html')
        .pipe(dest('dist'));
} */

exports.default = function () {
    watch('src/*.html', html);
};