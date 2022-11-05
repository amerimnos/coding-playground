function askPassword(ok, fail) {
    password = null;

    setTimeout(() => {

        password = prompt("비밀번호를 입력해주세요.", '');

        setTimeout(() => {
            user = {
                login() {
                    1 + 1
                }
            };

            setTimeout(() => {
                if (password == "rockstar") ok();
                else fail();
            }, 500);

        }, 500);

    }, 500);
}

let user = {
    name: 'John',

    login(result) {
        alert(this.name + (result ? ' 로그인 성공' : ' 로그인 실패'));
    }
};


/**
 * 방식1. 전달 받은 user는 호출 된 시점부터 무조건 고정됨...
 */

// askPassword(user.login.bind(user, true), user.login.bind(user, false));




/**
 * 방식2. 심플함, 문제는 입력 받은 후 함수 호출 전에 user가 바뀌면 결과도 바뀌게됨...
 */
askPassword(
    () => user.login(true),
    () => user.login(false)
);