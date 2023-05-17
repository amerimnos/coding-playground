const flatBtn = document.querySelector('.flat-btn');
const curvBtn = document.querySelector('.curv-btn');
const flatAnime = document.querySelector('animate.flat');
const curvAnime = document.querySelector('animate.curv');
const svg = document.querySelector('.svg');

flatBtn.addEventListener("pointerdown", function () {
    if (svg.dataset.mode === flatBtn.dataset.mode) return;
    svg.dataset.mode = flatBtn.dataset.mode;
    curvAnime.beginElement();
})

curvBtn.addEventListener("pointerdown", function () {
    if (svg.dataset.mode === curvBtn.dataset.mode) return;
    svg.dataset.mode = curvBtn.dataset.mode;
    flatAnime.beginElement();
})


