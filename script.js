console.log("script.js 読み込みOK");

let players = 1;
let currentPlayer = 1;
let score = 0;
let time = 30;
let timer = null;

// ★超重要：グローバル関数にする
function startGame(p) {
  console.log("startGame:", p);

  players = p;
  currentPlayer = 1;
  score = 0;
  time = 30;

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("controls").style.display = "block";

  updateUI();
  startTimer();
}

function updateUI() {
  document.getElementById("turn").innerText =
    players === 1 ? "SOLO MODE" : "PLAYER " + currentPlayer;

  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("timer").innerText = "Time: " + time;
}

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    time--;
    updateUI();

    if (time <= 0) {
      nextTurn();
    }
  }, 1000);
}

function nextTurn() {
  if (players === 1) {
    alert("1人プレー終了！スコア: " + score);
    time = 30;
    score = 0;
    updateUI();
    return;
  }

  currentPlayer++;

  if (currentPlayer > players) {
    alert("ゲーム終了！");
    location.reload();
    return;
  }

  time = 30;
  score = 0;
  updateUI();
}

function moveLeft() {
  console.log("left");
}

function moveRight() {
  console.log("right");
}

function stopMove() {
  console.log("stop");
}

function punch() {
  score += 10;
  updateUI();
}
