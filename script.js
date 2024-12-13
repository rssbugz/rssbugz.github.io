const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const scoreDiv = document.getElementById('score');

let score = 50;
let chance = 10; // 後端可調整

// 函式：從後端取得選項並顯示
function getOptions() {
  // 假設從後端取得的資料格式為一個包含10個選項的陣列
  fetch('/getOptions')
    .then(response => response.json())
    .then(data => {
      questionDiv.textContent = data.question; // 假設後端回傳問題
      optionsDiv.innerHTML = '';
      data.options.forEach((option, index1) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index1, data.correctAnswer);
        optionsDiv.appendChild(button);
      });
    });
}

// 函式：檢查答案
function checkAnswer(selected, correct) {
  if (selected === correct) {
    score += 5;
    // 播放隨機答對音效
    playAudio('correct');
  } else {
    score -= 10;
    // 播放隨機答錯音效
    playAudio('wrong');
  }
  scoreDiv.textContent = `分數：${score}`;
  chance--;
  if (score >= 100) {
    // 進入下一關
    window.location.href = '/nextLevel';
  } else if (score <= 0) {
    // 返回上一關
    window.location.href = '/prevLevel';
  } else {
    getOptions(); // 取得下一題
  }
}

// 函式：播放音效
function playAudio(type) {
  const audio = new Audio(`${type}${Math.floor(Math.random() * 5)}.mp3`);
  audio.play();
}

// 初始取得選項
getOptions();
