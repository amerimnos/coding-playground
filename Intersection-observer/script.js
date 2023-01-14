window.addEventListener("scroll", () => {
    activeAnimationTransY('.box', '--user-scroll-animation-translateY', 100);
})

/**
 * @description scroll에 따른 class 추가
 * @param target string : 예시) .box or #box
 * @param NameOfCustomCSS string
 * @param ValueOfTransY number
 */
function activeAnimationTransY(target, NameOfCustomCSS, ValueOfTransY) {
    var _scheduledAnimationFrame = false;
    var _boxElements = document.querySelectorAll(target);

    if (_scheduledAnimationFrame) return;

    _scheduledAnimationFrame = true;
    requestAnimationFrame(function () {
        _boxElements.forEach(function (el) {

            if (getElemOfViewportHeightRatio(el) < 0 || getElemOfViewportHeightRatio(el) > 1) return;

            if (el.getBoundingClientRect().bottom > ValueOfTransY && el.getBoundingClientRect().top < window.innerHeight - ValueOfTransY) {
                document.documentElement.style.setProperty(NameOfCustomCSS, ValueOfTransY + 'px');
                el.classList.add('active')
            }

            if (getElemOfViewportHeightRatio(el) === 0 || getElemOfViewportHeightRatio(el) === 1) {
                el.classList.remove('active')
            }
        })
        _scheduledAnimationFrame = false;
    })

    /**
     * @description 해당 요소들의 scroll ratio
     */
    function getElemOfViewportHeightRatio(el) {
        var _ratio = 0;

        if (_ratio >= 0 && _ratio <= 1) {
            _ratio = el.getBoundingClientRect().bottom / (window.innerHeight + el.getBoundingClientRect().height)
        }
        if (_ratio < 0) _ratio = 0;
        if (_ratio > 1) _ratio = 1;

        return _ratio;
    }
}