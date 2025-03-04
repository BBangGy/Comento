// 초기 배터리 수준 설정
let batteryLevel = 100;
let alarms = [];
let isDischarging = true; // 배터리가 감소 중인지 여부
const MAX_ALARMS = 3;
let updateBat = null; // 배터리 감소 타이머 참조

// 시간을 업데이트하는 함수
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const days = ["일","월","화",'수','목','금','토'];
    const year = String(now.getFullYear());
    const month = String(now.getMonth()+1).padStart(2,"0");
    const day = days[now.getDay()];
    const date = String(now.getDate());

    const topBar = document.querySelector('.topBar');
    topBar.innerHTML = `
        <div>${year}.${month}.${date} (${day})</div>
        <div>현재 시간: ${timeString}</div>
    `;

    // 알람 체크
    checkAlarms(hours, minutes, seconds);
}
//알람 설정 함수
function setAlarm() {
    const hourInput = document.getElementById('alarm-hour');
    const minuteInput = document.getElementById('alarm-minute');
    const secondInput = document.getElementById('alarm-second');

    const hour = hourInput.value.trim();
    const minute = minuteInput.value.trim();
    const second = secondInput.value.trim();

    if (hour === '' || minute === '' || second === '') {
        alert('모든 값을 입력해주세요.');
        return;
    }

    if (alarms.length >= MAX_ALARMS) {
        alert(`알람은 최대 ${MAX_ALARMS}개까지 설정 가능합니다.`);
        return;
    }

    const alarmTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    alarms.push(alarmTime);

    updateAlarmStatus();

    // 입력 필드 값을 '0'으로 초기화
    hourInput.value = '0';
    minuteInput.value = '0';
    secondInput.value = '0';
}

// 알람 상태 업데이트 함수
function updateAlarmStatus() {
    const alarmStatus = document.querySelector('#alarm-status');
    alarmStatus.innerHTML = ''; // 기존 알람 지우기

    if (alarms.length === 0) {
        alarmStatus.textContent = '알람이 설정되지 않았습니다.';
    } else {
        alarms.forEach(alarm => {
            const alarmItem = document.createElement('div');
            alarmItem.textContent = `알람 설정: ${alarm}`;
            alarmItem.style.padding = "5px";
            alarmItem.style.backgroundColor = "rgb(143, 238, 0)";
            alarmItem.style.borderRadius = "5px";
            alarmItem.style.marginBottom = "5px";
            alarmItem.style.color="black";
            alarmStatus.appendChild(alarmItem);
        });
    }
}

// 알람 체크 함수
function checkAlarms(hours, minutes, seconds) {
    const currentTime = `${hours}:${minutes}:${seconds}`.trim();
    if (alarms.includes(currentTime)) {
        const soundEnabled = document.getElementById('enable-sound').checked;
        if (soundEnabled) {
            const alarmSound = new Audio("./sounds/alarm.mp3");
            alarmSound.play();

            alarmSound.onended = () => {
                alert(`알람! 현재 시간은 ${currentTime}입니다.`);
            };
        } else {
            alert(`알람! 현재 시간은 ${currentTime}입니다.`);
        }
        // 울린 알람 제거
        alarms = alarms.filter(alarm => alarm !== currentTime);
        updateAlarmStatus();
    }
}

// 배터리 상태를 업데이트하는 함수
function updateBattery() {
    const batteryDiv = document.querySelector('#battery-status');
    const topBar = document.querySelector(".topBar");

    updateBat = setInterval(() => {
        if (isDischarging && batteryLevel > 0) {
            batteryLevel--; // 배터리 감소
            const isCharging = batteryLevel === 0 ? '충전 필요' : '배터리 사용 중';
            batteryDiv.textContent = `배터리: ${batteryLevel}% (${isCharging})`;

            // 배터리가 0%일 때
            if (batteryLevel === 0) {
                isDischarging = false;
                clearInterval(updateBat); // 감소 멈춤
                if (topBar) {
                    topBar.classList.add("fadeInEffect");
                }
                alert("배터리가 0%입니다. 충전이 필요합니다!");
            }
        }
    }, 1000); // 1초마다 실행
}

// 배터리를 충전하는 함수
function chargeBattery() {
    const batteryDiv = document.querySelector('#battery-status');
    const topBar = document.querySelector(".topBar");

    // 배터리 감소 멈춤
    if (updateBat) {
        clearInterval(updateBat); // 배터리 감소 타이머 중단
        isDischarging = false; // 감소 상태 해제
    }

    if (batteryLevel < 100) {
        const userConfirm = confirm("배터리 충전하시겠습니까?");
        if (userConfirm) {
            const chargeInterval = setInterval(() => {
                if (batteryLevel < 100) {
                    batteryLevel++; // 배터리 증가
                    const isCharging = batteryLevel === 100 ? "배터리 충전 완료" : "충전 중";
                    batteryDiv.textContent = `배터리: ${batteryLevel}% (${isCharging})`;

                    if (batteryLevel === 100) {
                        clearInterval(chargeInterval); // 충전 멈춤
                        batteryDiv.textContent = `배터리: ${batteryLevel}% (배터리 충전 완료)`;
                        alert("배터리 충전이 완료되었습니다!");
                        if (topBar.classList.contains('fadeInEffect')) {
                            topBar.classList.remove("fadeInEffect");
                        }
                        isDischarging = true; // 배터리 감소 상태 복구
                        updateBattery(); // 배터리 감소 재시작
                    }
                }
            }, 500); // 0.5초마다 실행
        }
    } else {
        alert("배터리가 이미 충전 완료 상태입니다!");
    }
}
// 이벤트 리스너 등록
document.getElementById('set-alarm').addEventListener('click', setAlarm);
document.getElementById('charge-battery').addEventListener('click', chargeBattery);

// 1초마다 시간 업데이트
setInterval(updateTime, 1000);

// 초기 실행
updateTime();
updateBattery();