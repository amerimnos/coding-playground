let user = {};

Object.defineProperty(user, "name", {
    value: "John",
    // defineProperty를 사용해 새로운 프로퍼티를 만들 땐, 어떤 플래그를 true로 할지 명시해주어야 합니다.
    enumerable: true,
    configurable: true
});

alert(user.name); // John
user.name = "Pete"; // Error