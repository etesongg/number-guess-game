//초기 설정
// 랜덤 번호 지정
// 유저가 번호를 입력하고 go 버튼을 누름
// 유저 번호 < 랜덤 번호 UP
// 유저 번호 > 랜덤 번호 DOWN
// 유저 번호 == 랜덤 번호 맞췄습니다.
// Reset 버튼 누르면 게임 리셋
// 5번 기회만 주어지고 기회를 다 쓰면 더이상 추측 불가, 버튼 비활성화
// 유저가 1-100 범위 밖에 있는 숫자를 입력하면 알려주고 기회를 깍지 않음
// 유저가 이미 입력한 숫자를 또 입력하면 알려주고 기회를 깍지 않음

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");

playButton.addEventListener("click", play); // 함수를 매개변수로 넘김 play() 괄호 넣으면 안됨

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1; // Math.random() 0~1 숫자를 반환(이때 1은 포함 안되는 1에 가까운 숫자를 반환)
    console.log(computerNum);
}

function play() {
    let userValue = userInput.value;
    if (userValue < computerNum){
        resultArea.textContent = "up"
    }else if (userValue > computerNum){
        resultArea.textContent = "down"
    }else {
        resultArea.textContent = "정답"
    }
}

pickRandomNum();