window.addEventListener("scroll", () => {
    activeAnimationTransY('.box', '--user-scroll-animation-translateY', 100);
})

/**
 * @param target string : 예시) .box or #box
 * @param NameOfCustomCSS string
 * @param ValueOfTransY number
 */

function activeAnimationTransY(target, NameOfCustomCSS, ValueOfTransY) {
    var scheduledAnimationFrame = false;
    var boxElements = document.querySelectorAll(target);

    if (scheduledAnimationFrame) return;

    scheduledAnimationFrame = true;
    requestAnimationFrame(function () {
        boxElements.forEach(function (el) {

            if (getElemOfViewportHeightRatio(el) < 0 || getElemOfViewportHeightRatio(el) > 1) return;

            if (el.getBoundingClientRect().bottom > ValueOfTransY && el.getBoundingClientRect().top < window.innerHeight - ValueOfTransY) {
                document.documentElement.style.setProperty(NameOfCustomCSS, ValueOfTransY + 'px');
                el.classList.add('active')
            }

            if (getElemOfViewportHeightRatio(el) === 0 || getElemOfViewportHeightRatio(el) === 1) {
                el.classList.remove('active')
            }
        })
        scheduledAnimationFrame = false;
    })
}

/**
 * 해당 요소의 viewport height의 위치 비율.
 */
function getElemOfViewportHeightRatio(el) {
    var _ratio = 0;

    //if(el.getBoundingClientRect().top > window.innerHeight || el.getBoundingClientRect().bottom < 0) return _ratio;

    if (_ratio >= 0 && _ratio <= 1) {
        _ratio = el.getBoundingClientRect().bottom / (window.innerHeight + el.getBoundingClientRect().height)
    }
    if (_ratio < 0) _ratio = 0;
    if (_ratio > 1) _ratio = 1;

    return _ratio;
}