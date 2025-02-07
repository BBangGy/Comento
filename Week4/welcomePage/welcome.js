// 로그인 검증 함수
function handleLogin() {
    const enteredId = document.getElementById("loginId").value.trim();
    const enteredPw = document.getElementById("loginPw").value.trim();
    const saveId = sessionStorage.getItem("userId");
    const savePw = sessionStorage.getItem("userPassword");
    console.log("아이디: ",saveId);
    console.log("비번: ",savePw);
    if (enteredId === saveId && enteredPw === savePw) {
        alert("로그인에 성공했습니다.");
        window.location.href = "../main.html";
    } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
}

// 회원가입 페이지 이동 함수
function redirectToSignUp() {
    window.location.href = "../SignIn/sign.html";
}

// 이벤트 리스너 추가
document.getElementById("loginBtn").addEventListener('click', handleLogin);
document.getElementById("signIn").addEventListener("click", redirectToSignUp);
