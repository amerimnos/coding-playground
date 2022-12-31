let TEST = {
    numOfSlidesToZeroDay: 0,
    instanceOfSwiper: null,
}

/* var test1 = new Swiper(".mySwiper", {
    width: 198,
    spaceBetween: 6,
    touchReleaseOnEdges: true,
    loopedSlidesLimit: false,

    on: {
        beforeInit: function () {
            const numOfSlides = this.el.querySelectorAll('.swiper-slide').length,
                numOfslidesToCopy = numOfSlides + 1,
                SumOfMarginsOnBothSidesOfSwiper = 40,
                widthOfSlide = this.params.width - SumOfMarginsOnBothSidesOfSwiper;

            TEST.numOfSlidesToZeroDay = numOfSlides;

            if (numOfSlides * (widthOfSlide + this.params.spaceBetween) <= window.innerWidth - SumOfMarginsOnBothSidesOfSwiper) {
                this.disable();
            } else {
                this.params.loop = true;
                this.params.loopAdditionalSlides = numOfslidesToCopy;
            }
        },
        resize: function () {
            window.addEventListener('orientationchange', () => {
                console.log('orientationchange...origin');
                setTimeout(() => {
                    test1.destroy();
                    controlZeroDaySwiper();
                }, 30);
            }, { once: true });
        },
    },
}); */

controlZeroDaySwiper();

window.addEventListener("orientationchange", function () {
    setTimeout(() => {
        TEST.instanceOfSwiper.destroy();
        controlZeroDaySwiper(); 
    }, 30);
});

function controlZeroDaySwiper() {
    TEST.instanceOfSwiper = new Swiper(".mySwiper", {
        width: 198,
        spaceBetween: 6,
        touchReleaseOnEdges: true,
        loopedSlidesLimit: false,

        on: {
            beforeInit: function () {

                try {
                    this.$el[0].querySelectorAll('.swiper-slide-duplicate, .swiper-notification').forEach(element => {
                        element.remove();
                    })
                } catch (error) { console.error(error) }

                console.log(TEST.numOfSlidesToZeroDay, 'TEST.numOfSlidesToZeroDay')
                TEST.numOfSlidesToZeroDay = this.el.querySelectorAll('.swiper-slide').length;

                const SumOfMarginsOnBothSidesOfSwiper = 40,
                    numOfslidesToCopy = TEST.numOfSlidesToZeroDay + 1,
                    widthOfSlide = this.params.width - SumOfMarginsOnBothSidesOfSwiper;

                if (TEST.numOfSlidesToZeroDay * (widthOfSlide + this.params.spaceBetween) <= window.innerWidth - SumOfMarginsOnBothSidesOfSwiper) {
                    console.log("기기 해상도가 더 큼")
                    this.allowTouchMove = false;
                } else {
                    console.log("기기 해상도가 더 작음")
                    this.params.loop = true;
                    this.params.loopAdditionalSlides = numOfslidesToCopy;
                }
                // debugger;
            },
        },
    });

    console.log(TEST.instanceOfSwiper, 'TEST.instanceOfSwiper');
}