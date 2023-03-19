/* Bing 채팅 결과물 */

function parallax() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });

        if (document.querySelectorAll('.parallax.active').length === 0) {
            window.removeEventListener('scroll', scrollListener);
        } else {
            window.addEventListener('scroll', scrollListener);
        }
    }, {threshold: 0});

    var elements = document.querySelectorAll(".parallax");
    elements.forEach(function (element) {
        observer.observe(element);
    });

    function scrollListener() {
        requestAnimationFrame(function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var elements = document.querySelectorAll(".parallax");
            elements.forEach(function (element) {
                var height = element.offsetHeight;
                var top = element.offsetTop - scrollTop;
                var center = top + height / 2;
                var screenCenter = window.innerHeight / 2;
                var ratio = (center - screenCenter) / screenCenter;
                ratio = Math.max(-1, Math.min(1, ratio)); // clamp the ratio between -1 and 1
                var translateY = 0;

                // TODO : viewport 너비에 따라서 해당 요소가 화면에서 사라졌을때의 translateY이 유동적으로 바뀌는대 행상 -100, +100이 되도록 해야한다.
                if (!element.classList.contains('active')) {
                    if (center < screenCenter) {
                        translateY = -100;
                    } else {
                        translateY = 100;
                    }
                } else {
                    translateY = ratio * 100;
                }
                element.style.transform = "translate3d(0, " + translateY + "px, 0)";
            });
        });
    }

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("load", scrollListener);
}
parallax();




/* ChatGPT 결과물... 이지만, 시간 관계상 여유 있을때 아래 코드 실험해 볼 예정. */
//parallaxEffect();
/* function parallaxEffect() {
    var targets = document.querySelectorAll('.parallax');
    var stateMap = new Map();

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var target = entry.target;
            var state = stateMap.get(target) || {
                isintersecting: false,
                translateY: 0
            };
            if (entry.isIntersecting) {
                state.isIntersecting = true;
                target.classList.add('active');
            } else {
                state.isIntersecting = false;
                target.classList.remove('active');
            }

            stateMap.set(target, state);
        });
    });

    targets.forEach(function (target) {
        observer.observe(target);
    });


    var rafld;
    var isScrolling = false;
    var prevScrollY = window.scrollY;
    function handleScroll() {
        var currScrollY = window.scrollY;

        stateMap.forEach(function (state, target) {
            if (state.isIntersecting) {
                var distanceFromTop = target.getBoundingClientRect().top;
                var translateY = distanceFromTop + 0.5;
                state.translateY = translateY;
            }
        });

        var direction = currScrollY > prevScrollY ? 'down' : 'up';
        prevScrollY = currScrollY;
        stateMap.forEach(function (state, target) {
            if (state.isIntersecting) {
                var translateY = state.translateY + (direction === 'down' ? currScrollY : -currScrollY);

                target.style.transform = "translate3d(0, " + translateY + "px, 0)";
            }
        });
        isScrolling = false;
    }
    window.addEventListener('scroll', function () {
        if (!isScrolling) {
            isScrolling = true;
            rafld = requestAnimationFrame(function () {
                handleScroll();
                clearTimeout(timeoutId);
            });
        }
        var timeoutId = setTimeout(function () {
            cancelAnimationFrame(rafld);
            isScrolling = false;
        }, 200);
    });
} */