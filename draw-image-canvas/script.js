
/* 
https://codepen.io/AliKlein/pen/dyOqrEB?editors=0010 javascript로 리팩토링
*/


controlImageUsingCanvasWhenScroll();

function controlImageUsingCanvasWhenScroll() {

    const context = document.querySelector('canvas').getContext("2d");
    let requestId = null;
    let images = [];
    let scrollHeight = 4000;
    let width = 1158;
    let height = 770;
    let numFrames = 147;
    let frameIndex = 0;

    preloadImages();
    renderCanvas();
    render();
    window.addEventListener("scroll", handleScroll);

    function getCurrentFrame(index) {
        return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, "0")}.jpg`;
    }

    function preloadImages() {
        for (let i = 1; i <= numFrames; i++) {
            const img = new Image();
            const imgSrc = getCurrentFrame(i);
            img.src = imgSrc;
            images.push(img)
        }
    }

    function handleScroll() {
        const scrollFraction = window.scrollY / (scrollHeight - window.innerHeight);
        const index = Math.min(
            numFrames - 1,
            Math.ceil(scrollFraction * numFrames)
        );

        if (index <= 0 || index > numFrames) {
            return;
        }
        frameIndex = index;
    }

    function render() {
        if (!document.querySelector('canvas') || images.length < 1) {
            return;
        }
        context.drawImage(images[frameIndex], 0, 0);
        requestId = requestAnimationFrame(render);
    }

    function renderCanvas() {
        context.canvas.width = width;
        context.canvas.height = height;
    }
}