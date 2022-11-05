function askPassword(ok, fail) {
    let password = prompt("비밀번호를 입력해주세요.", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    loginOk() {
        console.log(this, 'asdfasdf');
        console.log(`${this.name}님이 로그인하였습니다.`);
    },

    loginFail() {
        console.log(this, 'asdfasdf');
        console.log(`${this.name}님이 로그인에 실패하였습니다.`);
    },

};

console.log(user.loginOk, 'user.loginOk')




askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
/**
 * 위에 녀석은 바인딩 되어 this 값이 존재함.. 해당 컨텍스트를 유지하지... user로...
 */



 askPassword(user.loginOk, user.loginFail);
/**
 * 위에 녀석은 함수 안에 this가 undefined라서 에러 발생.
 */



askPassword(
    () => user.loginOk(),
    () => user.loginFail()
);
/**
 * 왜 화살표 함수는 메서뜨 함수 안에 있는 this를 인식하는거지??
 * 화살표 함수를 사용하면 현재 컨텍스트를 잃지 않아 편리...
 */