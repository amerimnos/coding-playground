

//============= 방법1
const numberOfArraysToSeparateFromJSON = 2;

makeMultipleRequests();

function makeRequest(url) {
    return fetch(url).then(response => response.json());
}

function makeMultipleRequests() {
    return makeRequest('data_object_length.php')
        .then(response => {
            console.log('response', response);
            const requests = [];
            for (let i = 0; i < response; i += numberOfArraysToSeparateFromJSON) {
                requests.push(makeRequest(`data.php?offset=${i}&limit=${numberOfArraysToSeparateFromJSON}`));
            }
            return Promise.all(requests);
        }).then(responses => {
            let combinedObject = responses.flat();
            console.log('combinedObject', combinedObject);
        })
}






//============= 방법2 : 허접함
/* // 비동기 함수를 정의합니다.
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


const DataLength = [
    'data_object_length.php'
]

const requests = urls.map(url => fetchData(url));
Promise.all(requests)
    .then(results => {
        // 결과를 출력합니다.
        console.log(results);
    })
    .catch(error => {
        // 에러 처리를 합니다.
        console.error(error);
    }); */