const idList = [];
const pw1 = document.getElementById("pwInput");
const pw2 = document.getElementById("pwInputSecond");

// 비밀번호 패턴 검사
function checkPattern() {
    const pw1Input = pw1.value.trim();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[\W_]).{8,16}$/;
    
    if (!passwordPattern.test(pw1Input)) {
        alert("비밀번호는 최소 8자 이상 16자 이하, 대문자와 특수문자를 포함해야 합니다.");
    } else {
        alert("비밀번호가 올바른 형식입니다.");
    }
}

// 비밀번호 일치 검사
function checkPassword() {
    const pw1Input = pw1.value.trim();
    const pw2Input = pw2.value.trim();
    
    if (pw1Input === pw2Input) {
        alert("비밀번호 일치!");
    } else {
        alert("비밀번호 불일치");
    }
}

// 아이디 중복 검사
function checkId() {
    const idInput = document.getElementById('idInput');
    const newId = idInput.value.trim();
    
    if (idList.includes(newId)) {
        alert("중복된 아이디입니다.");
        idInput.value = "";
    } else {
        idList.push(newId);
        alert("아이디 사용 가능!");
    }
}

// 가입하기 버튼 클릭 시 아이디 & 비밀번호 `sessionStorage`에 저장 후 이동
document.querySelector(".completeButton").addEventListener("click", () => {
    let idInput = document.getElementById("idInput");
    let pwInput = document.getElementById("pwInput");

    let idValue = idInput.value.trim();
    let pwValue = pwInput.value.trim();


    if(idValue ==""){
        alert("아이디를 입력하세요!");
        idInput.focus();
        return;
    }
    if(pwValue==""){
        alert("비밀번호를 입력하세요!");
        pwInput.focus();
        return;
    }
    
    // 아이디 & 비밀번호 저장 (`sessionStorage` 사용)
    sessionStorage.setItem("userId", idValue);
    sessionStorage.setItem("userPassword", pwValue);

    window.location.href = "../welcomePage/welcome.html"; // `welcome.html`로 이동
});

// 이벤트 리스너 등록
document.querySelector(".idCheck").addEventListener("click", checkId);
document.querySelector(".pwCheck").addEventListener("click", checkPassword);
document.querySelector(".correctPattern").addEventListener("click", checkPattern);
console.log(idList);