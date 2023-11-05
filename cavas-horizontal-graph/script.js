const loaderContainer = document.getElementById("loader-container");
const animation1 = document.getElementById("animation1");
const animation2 = document.getElementById("animation2");
const animation3 = document.getElementById("animation3");
const animeFirst = document.querySelectorAll(".anime-first");
const animeEnd = document.querySelectorAll(".anime-end");

const animationReset = document.querySelectorAll(".animation-reset");

let isActive = false;
let isObserveActive = false;

/**
 * @description 연속으로 빠르게 할 경우 resetAnimation()이 작동하지 못하는 한계.
 */
function activateAnimation() {
    animation1.beginElement();

    animation1.addEventListener("endEvent", () => {
        animation2.beginElement();
    });

    animation2.addEventListener("endEvent", () => {
        animation3.beginElement();
        console.log('=end',);
        isActive = false;
    });

}

function resetAnimation() {
    animeEnd.forEach(element => {
        element.beginElement();
    });
}

let options = {
    rootMargin: "0px",
    threshold: 1.0,
};

let callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio === 1) {
            if (isActive === false) {
                isActive = true;
                isObserveActive = true;
                activateAnimation();
                console.log('active',);
            }
        } else {
            if (isActive === true) return;
            if(isObserveActive === false) return;
            resetAnimation();
            console.log('inactive',);

        }
    });
};
let observer = new IntersectionObserver(callback, options);

let target = document.querySelector("#loader-container");
observer.observe(target);









/* 
canvas로 1px 작는것 실패.
const canvas = document.querySelector(".ict__progress-bar--black");
const ctx = canvas.getContext("2d");

// 로딩 바의 너비와 높이를 설정합니다.
const barWidth = canvas.width;
const barHeight = canvas.height;

// 로딩 바의 색상을 설정합니다.
const barColors = [
    "rgba(0, 0, 0, 0.1)",
    "rgba(0, 0, 0, 0.2)",
    "rgba(0, 0, 0, 0.3)",
    "rgba(0, 0, 0, 0.4)",
    "rgba(0, 0, 0, 0.5)",
    "rgba(0, 0, 0, 0.6)",
    "rgba(0, 0, 0, 0.7)",
    "rgba(0, 0, 0, 0.8)",
    "rgba(0, 0, 0, 0.9)",
    "rgba(0, 0, 0, 1.0)",
];
let progress = 0;

// 로딩 바의 진행률을 업데이트합니다.
const progressInterval = setInterval(() => {
    ctx.fillStyle = barColors[progress];
    ctx.fillRect(progress * barWidth / barColors.length, 0, barWidth / barColors.length, barHeight);
    progress++;

    if(progress > barColors.length) clearInterval(progressInterval);
    console.log('11', );
}, 1000);
 */