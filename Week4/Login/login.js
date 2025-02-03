const idList = [];

function checkPassword(){
    const pw1= document.getElementById("pwInput");
    const pw2= document.getElementById("pwInputSecond");
    pw1Input= pw1.value.trim();
    pw2Input= pw2.value.trim();

    if(pw1Input===pw2Input){
        alert("일치");
    }
    else{
        alert("불일치");
    }
}
function checkId(){
    const idInput = document.getElementById('idInput');
    const newId = idInput.value.trim()
    
    if(idList.includes(newId)){
        alert("중복된 아이디");
        idInput.value="";
    }else{
        idList.push(newId);
        alert("아이디 사용가능");
    }
}


document.querySelector(".idCheck").addEventListener('click',checkId);
document.querySelector(".pwCheck").addEventListener('click',checkPassword);
document.querySelector(".completeButton").addEventListener('click',()=>{

    window.location.href="../main.html";
    }
)