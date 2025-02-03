document.querySelector(".add").addEventListener("click", addList);

function addList() {
    const todoInput = document.getElementById("todo");
    const todoText = todoInput.value.trim(); // 입력값 가져오기 (공백 제거)

    if (todoText === '') {
        alert("할 일을 입력해주세요.");
        return;
    }

    const todoContainer = document.getElementById("todo-container");
    document.getElementById("todo-alarm").style.display = "none"; // 알림 메시지 숨기기

    // 새로운 할 일 항목 생성 후 추가
    const todoItem = createTodoItem(todoText);
    todoContainer.appendChild(todoItem);

    todoInput.value = ''; // 입력창 초기화
}

function createTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.style.display = "flex";
    todoItem.style.alignItems = "center";
    todoItem.style.justifyContent = "space-between";
    todoItem.style.padding = "5px";
    todoItem.style.backgroundColor = "white";
    todoItem.style.border="1px solid black"
    todoItem.style.borderRadius = "5px";
    todoItem.style.marginBottom = "5px";
    todoItem.style.color = "rgb(45, 45, 206)";
    todoItem.style.width = "30em";
    todoItem.style.boxShadow='2px 2px 2px black'

    // 할 일 텍스트 요소 생성
    const todoTextElement = document.createElement('span');
    todoTextElement.textContent = text;

    // 버튼 컨테이너 생성 (삭제/수정 버튼 정렬용)
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "5px"; // 버튼 간격 설정

    // 삭제 버튼 생성
    const deleteButton = createDeleteButton(todoItem);
    // 수정 버튼 생성
    const fixButton = createFixButton(todoTextElement);

    // 버튼 컨테이너에 버튼 추가
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(fixButton);

    // 요소 추가
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(buttonContainer); // 버튼 컨테이너 추가

    return todoItem;
}

function createDeleteButton(todoItem) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "삭제";
    deleteButton.style.padding = "2px 8px";
    deleteButton.style.border = "none";
    deleteButton.style.backgroundColor = "rgb(255, 170, 117)";
    deleteButton.style.color = "white";
    deleteButton.style.borderRadius = "3px";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.border = 'black 2px solid'

    deleteButton.addEventListener("click", function () {
        handleDelete(todoItem);
    });

    return deleteButton;
}

function createFixButton(todoTextElement) {
    const fixButton = document.createElement('button');
    fixButton.textContent = "수정";
    fixButton.style.backgroundColor = "skyblue";
    fixButton.style.color = "white";
    fixButton.style.borderRadius = "3px";
    fixButton.style.cursor = "pointer";

    fixButton.addEventListener("click", () => {
        handleFix(todoTextElement);
    });

    return fixButton;
}

function handleFix(todoTextElement) {
    const currentText = todoTextElement.textContent;
    
    // 이미 수정 중이면 새로운 입력창을 만들지 않음
    if (todoTextElement.querySelector("input")) return;

    // 입력 필드 생성
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText;
    inputField.style.width = "25em";
    inputField.style.marginRight = "5px";

    // 저장 버튼 생성
    const saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.style.backgroundColor = "rgb(181, 246, 83)";
    saveButton.style.color = "white";
    saveButton.style.borderRadius = "3px";
    saveButton.style.cursor = "pointer";

    // 기존 요소 삭제 후 입력 필드 및 저장 버튼 추가
    todoTextElement.textContent = "";
    todoTextElement.appendChild(inputField);
    todoTextElement.appendChild(saveButton);

    // 저장 버튼 클릭 이벤트
    saveButton.addEventListener("click", () => {
        const newText = inputField.value.trim();
        if (newText !== "") {
            todoTextElement.textContent = newText;
        } else {
            todoTextElement.textContent = currentText; // 변경하지 않음
        }
    });

    // 엔터 키로 저장 가능하도록 설정
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            saveButton.click();
        }
    });
}

function handleDelete(todoItem) {
    const todoContainer = document.getElementById("todo-container");
    todoContainer.removeChild(todoItem);
    checkEmptyList();
}

function checkEmptyList() {
    const todoContainer = document.getElementById("todo-container");
    const todoAlarm = document.getElementById("todo-alarm");

    if (todoContainer.children.length === 0) {
        todoAlarm.style.display = "block"; // 알림 메시지 다시 표시
    }
}
