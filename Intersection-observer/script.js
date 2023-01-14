
const numSteps = 20.0;
let boxElements;


window.addEventListener("load", () => {
    boxElements = document.querySelectorAll(".box");
    createObserver();
}, false);


window.addEventListener("scroll", () => {
    activeAnimationTransY();
})

/**
 * 해당 요소 어느 위치에서 활성화 할지 상정
 * rAF 활용하여 비동기 수행 - 랜더링 관련 성능 최적화
 */
function activeAnimationTransY() {
    var scheduledAnimationFrame = false;
    if (scheduledAnimationFrame) return;

    scheduledAnimationFrame = true;
    requestAnimationFrame(function () {
        boxElements.forEach(function (el) {
            if (el.getBoundingClientRect().y < window.innerHeight - 100 && el.getBoundingClientRect().y > 100) {
                el.classList.add('active')
            }
        })
        scheduledAnimationFrame = false;
    })
}

/**
 * 해당 요소 안보일 때만 API 활용 - 비동기로 메인쓰레드 부화 감소 목적
 * 해당 요소가 전부 보이고 더 안 쪽으로 들어 왔을때 콜백함수가 실행 안되는 제약 때문
 */
function createObserver() {
    boxElements.forEach(function (el) {
        let observer;
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: buildThresholdList()
        };

        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(el);

        function handleIntersect(entries, observer) {

            entries.forEach((entry) => {
                if (entry.intersectionRatio === 0) {
                    entry.target.classList.remove('active');
                }
            });
        }

        function buildThresholdList() {
            let thresholds = [];
            let numSteps = 20;

            for (let i = 1.0; i <= numSteps; i++) {
                let ratio = i / numSteps;
                thresholds.push(ratio);
            }

            thresholds.push(0);
            return thresholds;
        }

    });
}