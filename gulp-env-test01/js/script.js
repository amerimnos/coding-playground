
var a = 1;
var b = 2;
const c = 3;

/**
 * test 123
 */
function test123() {
    return a + b;
}

console.log('test123()', test123() + 2);
console.log('4441231231231231231234');

setTimeout(function test321() {
    c = test123 + 1;
}, 1000);