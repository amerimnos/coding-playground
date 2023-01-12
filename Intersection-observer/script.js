
const numSteps = 20.0;

let boxElements;

// Set things up
window.addEventListener("load", (event) => {
    boxElements = document.querySelectorAll(".box");
    createObserver();
}, false);



/**
 * 높이값이 작고 트렌지션Y 모션이 클 경우만 활용
 */
function transYactive(params) {
    /* 뷰퍼트 하이 - 해당 요소 높이 절대값 < 100 이면
    active 추가 */
}


/**
 * 해당 요소 없을 때만 활용
 */
function createObserver() {
    boxElements.forEach(function (el) {
        let observer;
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: buildThresholdList()
        };

        //if (el.getBoundingClientRect().height < 100) options.rootMargin = "-100px"
        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(el);

        function handleIntersect(entries, observer) {
            
            entries.forEach((entry) => {
                console.log('entry.rootBounds :' + observer.rootMargin);
                console.log('entry.intersectionRatio :' + entry.intersectionRatio);
                console.log('entry.intersectionRect.height :' + entry.intersectionRect.height + ' entry.boundingClientRect.height  :' + entry.boundingClientRect.height);

/*                 if (entry.intersectionRect.height === entry.boundingClientRect.height) {
                    entry.target.classList.add('active');
                } */
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