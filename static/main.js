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
let resetButton = document.getElementById("reset-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
chanceArea.textContent = `남은 기회: ${chances}`
let history = [];
let settingButton = document.getElementById("setting-button");
let settingArea = document.getElementById("setting-area");
let selectRange = document.getElementById("select-range");
let selectChances = document.getElementById("select-chances");
let completionButton = document.getElementById("completion-button");
let inputList = document.getElementById("input-list")

playButton.addEventListener("click", play); // 함수를 매개변수로 넘김 play() 괄호 넣으면 안됨
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = ""
});
settingButton.addEventListener("click", setting);
completionButton.addEventListener("click", completion)

function pickRandomNum(min, max) {
    // computerNum = Math.floor(Math.random() * 100) + 1; // Math.random() 0~1 숫자를 반환(이때 1은 포함 안되는 1에 가까운 숫자를 반환)
    computerNum = Math.floor(Math.random()*(max-min+1)) + min; // 출처 https://velog.io/@woodie/JS-Math-random
    resultArea.textContent = `up! down! 재밌는 게임~ `;
    console.log(computerNum)
}

function play() {
    let userValue = userInput.value;

    // 유효성 검사
    if (userValue < 1 || userValue > 100){
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요.";
        return;
    }

    if (history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요."
        return;
    }

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}`

    if (userValue < computerNum){
        resultArea.textContent = "up!"
    }else if (userValue > computerNum){
        resultArea.textContent = "down!"
    }else {
        resultArea.textContent = "정답!!";
        resultArea.style.color = "#5585b5"
        playButton.disabled = true;
    }

    history.push(userValue);
    inputList.textContent = `입력한 숫자 : ${history}`;

    if (chances < 1){
        gameOver = true;
    }

    if (gameOver){
        playButton.disabled = true;
        resultArea.textContent = "실패!!";
        resultArea.style.color = "#f95959"
    }
    console.log(`chance: ${chances}, history: ${history}`)
}

function reset() {
    chances = 3;
    history = [];
    gameOver = false
    playButton.disabled = false;
    userInput.value = "";
    resultArea.textContent = `up! down! 재밌는 게임~ `;
    chanceArea.textContent = `남은 기회: ${chances}`
    inputList.textContent = `입력한 숫자 : ${history}`;
    pickRandomNum(1, 100);
}

function setting() {
    if (settingArea.style.display === "none"){
        settingArea.style.display = "block";
    }else{
        settingArea.style.display = "none";
    }
}

function completion() {
    let rangeValue = selectRange.options[selectRange.selectedIndex].value;
    let chanceValue = selectChances.options[selectChances.selectedIndex].value;

    switch(true){
        case rangeValue == 200:
            pickRandomNum(1, 200);
            break;
        case rangeValue == 100:
            pickRandomNum(1, 100);
            break;
        case rangeValue == 50:
            pickRandomNum(1, 50);
            break;
        case rangeValue == 25:
            pickRandomNum(1, 25);
            break;    
    }

    switch(true){
        case chanceValue == 20:
            chances = 20;
            break;
        case chanceValue == 15:
            chances = 15;
            break;
        case chanceValue == 10:
            chances = 10;
            break;
        case chanceValue == 3:
            chances = 3;
            break;
    }
    chanceArea.textContent = `남은 기회: ${chances}`
    history = [];
    inputList.textContent = `입력한 숫자 : ${history}`;
    setting();
}

pickRandomNum(1, 100);