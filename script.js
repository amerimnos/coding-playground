
let temp = '';
let test = debounce(f, 1000);

function debounce(func, ms) {
    let timeout;
    return function (...arguments) {
        temp += arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
}

function f() {
    alert(temp);
}

setTimeout(() => { test('a'); }, 10);   // 무시(1000ms 이내에 아래 함수가 실행)
setTimeout(() => { test('b'); }, 100);  // 발생(100ms 이후 부터 1000ms 이내에 실행되는 함수 없음)
setTimeout(() => { test('c'); }, 1200); // 무시(1000ms 이내에 아래 함수가 실행)
setTimeout(() => { test('d'); }, 1400); // 무시(1000ms 이내에 아래 함수가 실행)
setTimeout(() => { test('e'); }, 2500); // 발생(2500ms 이후 부터 1000ms 이내에 실행되는 함수 없음)
