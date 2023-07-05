handleSectionScrollRatio();

function handleSectionScrollRatio() {
    scrollRatio('section02', 5);
}

function scrollRatio(parentElem, TotalNumDividingSection) {
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

window.addEventListener("scroll", handleSectionScrollRatio);