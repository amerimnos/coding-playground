let promise = new Promise((resolve, reject) => {
    //setTimeout(() => resolve(alert(123)), 1000);
    setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// .catch(f)는 promise.then(null, f)과 동일하게 작동합니다
promise.then(null,alert); // 1초 뒤 "Error: 에러 발생!" 출력