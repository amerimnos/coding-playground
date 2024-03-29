/**
 * 모션 구현시 체크 리스트
 * 1. css variable은 지양해야 될듯하다.. 연속된 요소의 모션이 있을 경우 
 * css timing function 사용하면 끝날 때를 기다릴 수 없기 때문에 문제가 복잡해짐. 
 * 아싸리, js에서 처리를 지향.
 */

const YGT = {};

YGT.controlImageUsingCanvasWhenScroll = function controlImageUsingCanvasWhenScroll() {
    const context = document.querySelector('canvas').getContext("2d");
    let section1 = document.querySelector('.section01');
    let canvasElemWrap = document.querySelector('.canvas-wrap');
    let canvasElem = document.querySelector('canvas');
    let requestId = null;
    let images = [];
    let scrollHeight = 4000;
    let width = 1158;
    let height = 770;
    let numFrames = 147;
    let frameIndex = 0;
    let countLoadImg = 0;
    isFirstImgLoading = false;

    preloadImages();
    renderCanvas();

    window.addEventListener("scroll", function () {
        requestAnimationFrame(handleScroll);
    });

    function init() {
        context.drawImage(images[0], 0, 0);
    }

    function getCurrentFrame(index) {
        return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, "0")}.jpg`;
    }

    function preloadImages() {
        for (let i = 1; i <= numFrames; i++) {
            const img = new Image();
            const imgSrc = getCurrentFrame(i);
            img.src = imgSrc;
            images.push(img);
            img.addEventListener('load', function () {
                countLoadImg++

                if (countLoadImg === numFrames) {
                    init();
                    handleScroll();
                }
            });
        }
    }
    function handleScroll() {
        const rect = section1.getBoundingClientRect();
        const isInViewport = rect.top <= 0 && rect.bottom > window.innerHeight;

        if (!isInViewport) {
            return;
        }

        if (!document.querySelector('canvas') || images.length < 1) {
            return;
        }

        const scrollFraction = Math.abs(rect.top) / (rect.height - window.innerHeight);
        frameIndex = Math.min(
            numFrames - 1,
            Math.ceil(scrollFraction * numFrames)
        );
        context.drawImage(images[frameIndex], 0, 0);
    }

    function renderCanvas() {
        context.canvas.width = width;
        context.canvas.height = height;
    }
}

YGT.handleSectionScrollRatio = function handleSectionScrollRatio() {
    YGT.scrollRatio('section02', 5);
}

YGT.scrollRatio = function scrollRatio(parentElem, TotalNumDividingSection) {
    const section = document.querySelector(`.${parentElem}`);
    const num = TotalNumDividingSection;
    const { top, height } = section.getBoundingClientRect();
    let sectionOffsetTop = top;
    const sectionHeight = height;
    const interpolation = 100;

    if (sectionOffsetTop >= interpolation || Math.abs(sectionOffsetTop) >= sectionHeight + interpolation) {
        return; // viewport가 elem 영역을 안에 있을때만 적용
    }

    if (sectionOffsetTop > 0) sectionOffsetTop = 0;
    if (Math.abs(sectionOffsetTop) > sectionHeight) sectionOffsetTop = sectionHeight;

    const scrollRateOfSession = (Math.abs(sectionOffsetTop) / sectionHeight).toFixed(5);
    const reverseScrollRateOfSession = (1 - scrollRateOfSession).toFixed(5);

    const scrollRateOfDividedArea = scrollRateOfSession * num;
    const reverseScrollRateOfDividedArea = 1 - scrollRateOfDividedArea;

    const scrollRateOfDividedAreas = [];
    const reverseScrollRateOfDividedAreas = [];

    for (let i = 0; i < num; i++) {
        const scrollRate = Math.max(0, scrollRateOfDividedArea - i).toFixed(5);
        const reverseScrollRate = Math.max(0, reverseScrollRateOfDividedArea + i).toFixed(5);
        scrollRateOfDividedAreas.push(Math.min(1, scrollRate).toFixed(5));
        reverseScrollRateOfDividedAreas.push(Math.min(1, reverseScrollRate).toFixed(5));
    }

    section.style.setProperty(`--user-${parentElem}-scroll-ratio`, scrollRateOfSession);
    section.style.setProperty(`--user-${parentElem}-scroll-ratio--reverse`, reverseScrollRateOfSession);

    for (let i = 0; i < num; i++) {
        const j = i + 1;
        section.style.setProperty(`--user-${parentElem}-divided-area${j}-scroll-ratio--reverse`, reverseScrollRateOfDividedAreas[i]);
        section.style.setProperty(`--user-${parentElem}-divided-area${j}-scroll-ratio`, scrollRateOfDividedAreas[i]);
    }
}

YGT.setParallaxScrollMotion = function setParallaxScrollMotion() {
    let defParallaxTranslateAmount = 300,
        elements = document.querySelectorAll(".intersectionElem"),
        isTriggerParallaxScroll = true,
        start = 0,
        moveVariable = 0,
        done = false;

    if (elements.length === 0) return;

    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var target = entry.target,
                isIntersecting = entry.isIntersecting;

            target.classList.toggle("active", isIntersecting);
        });

        var activeParallaxElements = document.querySelectorAll('.intersectionElem.active');
        if (activeParallaxElements.length === 0) {
            window.removeEventListener('scroll', parallaxScrollListenerWrapper);
        } else if (!window.parallaxScrollListenerWrapper) {
            window.addEventListener('scroll', parallaxScrollListenerWrapper);
        }
    }, { threshold: 0 });


    elements.forEach(function (element) {
        observer.observe(element);
    });

    window.requestAnimationFrame(parallaxScrollListener);

    function parallaxScrollListenerWrapper() {
        if(isTriggerParallaxScroll === false) return;
        isTriggerParallaxScroll = false;

        elements.forEach(function (element, index) {
            getTransY(element, index);
        })

        setTimeout(() => {
            window.requestAnimationFrame(parallaxScrollListener);
        }, 50);
    };

    function parallaxScrollListener(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        const elapsed = timestamp - start;

        elements.forEach(function (element, index) {
            let height = element.offsetHeight,
                top = element.getBoundingClientRect().top,
                center = top + height / 2,
                screenCenter = window.innerHeight / 2,
                ratio = Math.max(-1, Math.min(1, ((center - screenCenter) / (screenCenter + height / 2))));

            //const easedRatio = easeCubicBezier(ratio);
            
            if (!element.classList.contains('active')) {
                moveVariable = center < screenCenter ? -defParallaxTranslateAmount : defParallaxTranslateAmount;
            } else {
                moveVariable = ratio * defParallaxTranslateAmount;
            }
            element.style.transform = `translate3d(0, ${YGT[`transformedTranslateY${index}`] + elapsed}px, 0) rotate(${YGT[`transformedTranslateY${index}`] + elapsed}deg)`; // TODO : 큐빅 베지어 적용하여 부드럽게 적용 여부 확인 필요.
        });

        if(elapsed >= moveVariable) {
            isTriggerParallaxScroll = true;
            start = undefined;
        }
        if(elapsed < moveVariable) {
            window.requestAnimationFrame(parallaxScrollListener);
        }
    }

    function easeCubicBezier(t) {
        return 3 * t * t - 2 * t * t * t;
    }

    function getTransY(element, index) {
        const computedStyle = window.getComputedStyle(element);
        const translateY = computedStyle.getPropertyValue('transform') || '0';
        const objectKey = `transformedTranslateY${index}`;

        if (translateY !== '0') {
            const matrix = new WebKitCSSMatrix(translateY);
            const transformedTranslateY = matrix.m42;
            return YGT[objectKey] = transformedTranslateY;
        } else {
            console.log('현재 translateY 값: 0');
            return YGT[objectKey] = 0;
        }
    }
}

YGT.setCubicBazierMotion = function setCubicBazierMotion() {
    const box = document.querySelector('.box');
    let startTime, duration = 500; // 애니메이션 지속시간 2초

    // ease-in-out 타이밍 함수
    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOut(progress);
      const targetX = 100;
      box.style.transform = `translateX(${easedProgress * targetX}px)`;

      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      }
    }

    function getTransX(element, index) {
        const computedStyle = window.getComputedStyle(element);
        const translateX = computedStyle.getPropertyValue('transform') || '0';
        const objectKey = `transformedTranslateX${index}`;

        if (translateX !== '0') {
            const matrix = new WebKitCSSMatrix(translateX);
            const transformedTranslateX = matrix.m42;
            return YGT[objectKey] = transformedTranslateX;
        } else {
            console.log('현재 translateX 값: 0');
            return YGT[objectKey] = 0;
        }
    }

    window.addEventListener('scroll', function() {
      startTime = null; // 애니메이션 재시작을 위해 startTime 초기화
      requestAnimationFrame(animate);
    });
}


YGT.setParallaxScrollMotion();
YGT.handleSectionScrollRatio();
YGT.controlImageUsingCanvasWhenScroll();
YGT.setCubicBazierMotion();

window.addEventListener("scroll", YGT.handleSectionScrollRatio);