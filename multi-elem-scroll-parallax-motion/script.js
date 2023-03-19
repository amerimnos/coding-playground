function parallax() {
    var defParallaxTranslateAmount = 200;
    var elements = document.querySelectorAll(".parallax");
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var target = entry.target;
            var isIntersecting = entry.isIntersecting;
            target.classList.toggle("active", isIntersecting);
        });

        var activeParallaxElements = document.querySelectorAll('.parallax.active');
        if (activeParallaxElements.length === 0) {
            window.removeEventListener('scroll', scrollListener);
        } else if (!window.scrollListener) {
            window.addEventListener('scroll', scrollListener);
        }
    }, { threshold: 0 });


    elements.forEach(function (element) {
        observer.observe(element);
    });

    function scrollListener() {
        requestAnimationFrame(function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var elements = document.querySelectorAll(".parallax");
            elements.forEach(function (element) {
                var height = element.offsetHeight;
                var top = scrollTop + element.getBoundingClientRect().top - scrollTop;
                var center = top + height / 2;
                var screenCenter = window.innerHeight / 2;
                var ratio = (center - screenCenter) / screenCenter;
                ratio = Math.max(-1, Math.min(1, ratio));
                var translateY = 0;

                if (!element.classList.contains('active')) {
                    translateY = center < screenCenter ? -defParallaxTranslateAmount : defParallaxTranslateAmount;
                } else {
                    translateY = ratio * defParallaxTranslateAmount;
                }
                element.style.transform = "translate3d(0, " + translateY + "px, 0)";
            });
        });
    }

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("load", scrollListener);
}

parallax();