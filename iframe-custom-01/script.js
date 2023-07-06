// iframe 요소 선택
var iframe = document.getElementById('myIframe');

// iframe의 내용이 로드된 후에 실행되는 이벤트 핸들러 등록
iframe.onload = function () {
    // iframe 내의 문서 객체에 액세스
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // 복제할 요소 선택
    var originalElements = iframeDoc.querySelectorAll('#index_list .slick-slide:not(.slick-cloned)');

    // 요소 복제
    var clonedElements = Array.from(originalElements).map(function (originalElement) {
        return originalElement.cloneNode(true);
    });

    // 복제한 요소를 원하는 곳에 추가
    var targetElement = document.getElementById('targetElement');
    clonedElements.forEach(function (clonedElement) {
        targetElement.appendChild(clonedElement);
    });
};


//prependStringToImageSrc('https://ir.gsifn.io/kbfng/v4/main/');
/* function prependStringToImageSrc(prependString) {
    const images = document.getElementsByTagName('img');

    for (let i = 0; i < images.length; i++) {
        let src = images[i].getAttribute('src');
        src = prependString + src;
        images[i].setAttribute('src', src);
    }
} */

