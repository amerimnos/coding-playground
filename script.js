let TEST = {
    numOfSlidesToZeroDay: 0,
    instanceOfSwiper: null,
}

TEST.instanceOfSwiper = new Swiper(".mySwiper", {
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
                console.log('orientationchange...')
                setTimeout(() => {
                    this.destroy();
                    controlZeroDaySwiper();
                }, 30);
            }, { once: true }
            );
        },
    },
});

function controlZeroDaySwiper() {

    TEST.instanceOfSwiper = new Swiper(".mySwiper", {
        width: 198,
        spaceBetween: 6,
        touchReleaseOnEdges: true,
        loopedSlidesLimit: false,

        on: {
            beforeInit: function () {

                const numOfslidesToCopy = TEST.numOfSlidesToZeroDay + 3,
                    SumOfMarginsOnBothSidesOfSwiper = 40,
                    widthOfSlide = this.params.width - SumOfMarginsOnBothSidesOfSwiper;

                if (TEST.numOfSlidesToZeroDay * (widthOfSlide + this.params.spaceBetween) <= window.innerWidth - SumOfMarginsOnBothSidesOfSwiper) {

                        try {
                            this.$el[0].querySelectorAll('.swiper-slide-duplicate, .swiper-notification').forEach(element => {
                                element.remove();
                            })
                        } catch (error) { }
                        this.update();
                        this.allowTouchMove = false;
                } else {
                    this.params.loop = true;
                    this.params.loopAdditionalSlides = numOfslidesToCopy;
                    this.update();
                }
            },
            resize: function () {
                window.addEventListener('orientationchange', () => {
                    setTimeout(() => {
                        TEST.instanceOfSwiper.init();
                        TEST.instanceOfSwiper.destroy();
                        controlZeroDaySwiper();
                    }, 30);
                });
            },
        },
    });
}