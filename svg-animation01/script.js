const flatBtn = document.querySelector('.flat-btn');
const curvBtn = document.querySelector('.curv-btn');
const flatAnime = document.querySelector('animate.flat');
const curvAnime = document.querySelector('animate.curv');
const svg = document.querySelector('.svg');
let isActive = false;

flatBtn.addEventListener("pointerdown", function () {
    if (svg.dataset.mode === flatBtn.dataset.mode) return;
    if (isActive === false) {
        isActive = true
        svg.dataset.mode = flatBtn.dataset.mode;
        curvAnime.beginElement();
        setTimeout(() => {
            isActive = false;
        }, 500);
    }
})

curvBtn.addEventListener("pointerdown", function () {
    if (svg.dataset.mode === curvBtn.dataset.mode) return;
    if (isActive === false) {
        isActive = true
        svg.dataset.mode = curvBtn.dataset.mode;
        flatAnime.beginElement();
        setTimeout(() => {
            isActive = false;
        }, 500);
    }
})

