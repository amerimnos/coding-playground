// 비동기 함수를 정의합니다.
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


// offset과 limit 값을 계산하여 URL을 생성하는 함수를 정의합니다.
function createUrl(offset, limit) {
    return `data.php?offset=${offset}&limit=${limit}`;
}

// offset 값을 0으로 초기화합니다.
let offset = 0;

// 100번 반복하여 URL을 생성합니다.
const urls = Array.from({ length: 100 }, () => {
    const url = createUrl(offset, 2);
    offset += 2;
    return url;
});

// 결과를 출력합니다.
console.log(urls);

/* const urls = [
    'data_object_length.php'
]
 */


const requests = urls.map(url => fetchData(url));
Promise.all(requests)
    .then(results => {
        // 결과를 출력합니다.
        console.log(results);
    })
    .catch(error => {
        // 에러 처리를 합니다.
        console.error(error);
    });






/* // XMLHttpRequest 객체를 생성합니다.
var xhr = new XMLHttpRequest();

// 요청을 보낼 URL을 설정합니다.
var url = 'data.php?offset=0&limit=2'; // offset과 limit 파라미터 추가
xhr.open('GET', url);

// 응답을 받을 때마다 처리할 콜백 함수를 지정합니다.
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // 응답을 처리합니다.
            var response = xhr.responseText;
            console.log(response);
        } else {
            // 에러 처리를 합니다.
            console.error(xhr.statusText);
        }
    }
};

// 요청을 보냅니다.
xhr.send(); */