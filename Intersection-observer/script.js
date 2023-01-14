window.addEventListener("scroll", () => {
    activeAnimationTransY('.box', '--user-scroll-animation-translateY', 100);
})

/**
 * @description scroll에 따른 class 추가
 * @param {string} target - 해당 요소 예시) '.box' or '#box'
 * @param {string} CSSCustomProp
 * @param {number} translateY
 */
function activeAnimationTransY(target, CSSCustomProp, translateY) {
    var _scheduledAnimationFrame = false;
    var _boxElements = document.querySelectorAll(target);

    if (_scheduledAnimationFrame) return;

    _scheduledAnimationFrame = true;
    requestAnimationFrame(function () {
        _boxElements.forEach(function (el) {

            if (getElemOfViewportHeightRatio(el) < 0 || getElemOfViewportHeightRatio(el) > 1) return;

            if (el.getBoundingClientRect().bottom > translateY && el.getBoundingClientRect().top < window.innerHeight - translateY) {
                document.documentElement.style.setProperty(CSSCustomProp, translateY + 'px');
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