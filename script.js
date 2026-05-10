let players = 1;
let currentPlayer = 1;
let score = 0;
let time = 30;
let timerId = null;

function startGame(p) {
  players = p;

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("controls").style.display = "block";

  currentPlayer = 1;
  score = 0;
  time = 30;

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
  clearInterval(timerId);

  timerId = setInterval(() => {
    time--;
    updateUI();

    if (time <= 0) {
      nextTurn();
    }
  }, 1000);
}

function nextTurn() {
  if (players === 1) {
    // 1人プレーはリセット
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

// ==== 操作系（仮） ====
function moveLeft() {
  console.log("左移動");
}

function moveRight() {
  console.log("右移動");
}

function stopMove() {
  console.log("停止");
}

function punch() {
  score += 10;
  updateUI();
}
