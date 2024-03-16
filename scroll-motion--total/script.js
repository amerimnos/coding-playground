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
        console.log('frameIndex : ' + frameIndex);
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

YGT.handleSectionScrollRatio();
YGT.controlImageUsingCanvasWhenScroll();

window.addEventListener("scroll", YGT.handleSectionScrollRatio);