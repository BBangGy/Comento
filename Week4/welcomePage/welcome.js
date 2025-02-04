
// 로그인 버튼 클릭 시 입력된 아이디 & 비밀번호 검증

document.getElementById("loginBtn").addEventListener('click',()=>{
    const enteredId = document.getElementById("loginId").value.trim();
    const enteredPw = document.getElementById("loginPw").value.trim();
    const saveId = document.sessionStorage.getItem("userId");
    const savePw = document.sessionStorage.getItem("userPassword");
    console.log(saveId);
    if(enteredId ==saveId && enteredPw==savePw){
        alert("로그인성공");
        window.location.href="../main.html";
    }
    else{
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
})

// 회원가입 버튼 클릭 시 회원가입 페이지로 이동
document.getElementById("signIn").addEventListener("click", function() {
    window.location.href = "../SignIn/sign.html";
});
