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
let chances;
let gameOver = false;
let userInputList;

let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chanceInput = document.getElementById("chance-range");
let chanceArea = document.getElementById("chance-area");
let rangeInput = document.getElementById("extent-range");
let rangeArea = document.getElementsByClassName("form-label")[0];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = ""
})

rangeArea.textContent = `업다운 범위 : ${rangeInput.value}`;
rangeInput.addEventListener("input", (event) => {
    rangeArea.textContent = `업다운 범위 : ${event.target.value}`;
    pickRandomNum()
});

chanceArea.textContent = `남은 횟수 : ${chanceInput.value}`;
chanceInput.addEventListener("input", (event) => {
    chanceArea.textContent = `남은 횟수 : ${event.target.value}`;
    chances = event.target.value;
})

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*rangeInput.value) + 1; // Math.random() 메서드는 0-1 사이에 숫자를 제공 그러므로 *rangeInput.value과 소수이하 버리기, +1 을 통해 1-rangeInput.value까지의 숫자로 만들어 줘야 함 
    console.log(computerNum)
}
pickRandomNum()

let initialChanceValue = 50;
let initialRangeValue = 260;

function initializeGame() {
    userInputList = []
    chances = chanceInput.value; 
    gameOver = false;

    chanceInput.value = initialChanceValue;
    rangeInput.value = initialRangeValue;

    chanceArea.textContent = "남은 횟수: " + chanceInput.value;
    rangeArea.textContent = "업다운 범위: " + rangeInput.value;
}
initializeGame()

function play() {
    let userValue = userInput.value;

    // 유효성 검사
    let maxExtentValue = parseInt(rangeInput.max);
    if (userValue > maxExtentValue || userValue < 1){
        resultArea.textContent = `1 ~ ${rangeInput.value} 사이의 숫자를 입력해 주세요.`;
        return; // 밑에 코드를 실행시키지 않는다.
    }

    if (userInputList.includes(userValue)){
         resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
         return;
    }

    chances--;
    chanceArea.textContent = `남은 횟수 : ${chances}`;

    if (userValue < computerNum){
        resultArea.textContent = "UP!!!"
    }else if (userValue > computerNum){
        resultArea.textContent = "Down!!!"
    }else {
        resultArea.textContent = "정답입니다."
        gameOver = true
    }

    userInputList.push(userValue)
    console.log(userInputList)

    if (chances < 1){
        gameOver = true
    }

    if (gameOver == true){
        playButton.disabled = true;
    }
}

function reset() {
    userInput.value = ""
    pickRandomNum()
    resultArea.textContent = "결과창"
    playButton.disabled = false;
    initializeGame()
}
