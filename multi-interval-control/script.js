// es5 버전으로, 원하는 인터벌을 제어할 수 있음.

var videoIntervalArr = [];

var elements = document.querySelectorAll('.test');
for (var index = 0; index < elements.length; index++) {
    (function (currentIndex) {
        var intervalId = setInterval(function () {
            console.log('The s were downloaded ' + currentIndex + ' in ios Safari.');
            setTimeout(function () {
                clearCustomInterval(1);
            }, 2000);
        }, 1000);
        videoIntervalArr[currentIndex] = intervalId;
    })(index);
}

function clearCustomInterval(customIndex) {
    clearInterval(videoIntervalArr[customIndex]);
}