// iframe 요소 선택
var iframe = document.getElementById('myIframe');

// iframe의 내용이 로드된 후에 실행되는 이벤트 핸들러 등록
iframe.onload = function () {
    // iframe 내의 문서 객체에 액세스
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // 복제할 요소 선택
    var originalElement = iframeDoc.querySelector('html');

    // 요소 복제
    var clonedElement = originalElement.cloneNode(true);

    // 복제한 요소를 원하는 곳에 추가
    var targetElement = document.getElementById('targetElement');
    targetElement.appendChild(clonedElement);
};