// 아래 코드의 결론 : requestAnimationFrame를 2번 호출 했으면 cancelAnimationFrame도 2번 해야한다.


const element = document.getElementById("some-element-you-want-to-animate");
let start, previousTimeStamp;
let done = false;
//let myReq = [];
let myReq = null;


function step(timestamp) {
    console.log(myReq);
    if (start === undefined) {
        start = timestamp;
    }
    const elapsed = timestamp - start;

    if (previousTimeStamp !== timestamp) {
        // Math.min()은 여기서 요소가 정확히 700px에 멈추는지 확인하기 위해 사용됩니다
        const count = Math.min(0.1 * elapsed, 700);
        element.style.transform = `translateX(${count}px)`;
        if (count === 700) done = true;
    }

    if (elapsed < 7000) {
        // 2초 이후에 애니메이션 종료
        previousTimeStamp = timestamp;
        if (!done) {
            //myReq[index] = window.requestAnimationFrame(step);
            myReq = window.requestAnimationFrame(step);
        }
    }
}

setTimeout(() => {
    window.requestAnimationFrame(step);
}, 500);
setTimeout(() => {
    window.requestAnimationFrame(step);
}, 600);

setTimeout(() => {
    cancelAnimationFrame(myReq);
}, 1500);
setTimeout(() => {
    cancelAnimationFrame(myReq);
}, 1600);


function clearCustomInterval(customIndex) {
    cancelAnimationFrame(myReq[customIndex]);
}