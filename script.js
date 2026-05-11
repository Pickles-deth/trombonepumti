const game =
document.getElementById("game");

const scoreEl =
document.getElementById("score");

const timerEl =
document.getElementById("timer");

const punchButton =
document.getElementById("punchButton");

const startScreen =
document.getElementById("startScreen");

const messageScreen =
document.getElementById("messageScreen");

const resultScreen =
document.getElementById("resultScreen");

const resultText =
document.getElementById("resultText");

const messageText =
document.getElementById("messageText");

const nextButton =
document.getElementById("nextButton");


//
// 主人公
//
const player =
document.createElement("img");

player.id = "player";

player.src =
"images/hero_idle.png";

let playerX = 100;
let playerY = 300;

player.style.left =
playerX + "px";

player.style.top =
playerY + "px";

game.appendChild(player);


//
// スコア
//
let score = 0;


//
// 敵
//
let enemies = [];


//
// パンチ状態
//
let punching = false;


//
// 入力
//
let up = false;
let down = false;
let left = false;
let right = false;


//
// マルチプレイ
//
let totalPlayers = 1;

let currentPlayer = 1;

let scores = [];

let timeLeft = 30;

let gameRunning = false;

let timerInterval;


//
// 人数選択
//
function selectPlayers(num){

    totalPlayers = num;

    scores =
    new Array(num).fill(0);

    startScreen.style.display =
    "none";

    showPlayerStart();
}
window.selectPlayers =
selectPlayers;

//
// 開始画面
//
function showPlayerStart(){

    messageScreen.style.display =
    "flex";

    messageText.innerText =
    "PLAYER " +
    currentPlayer +
    " START";
}


//
// スタートボタン
//
nextButton.addEventListener(
"click",()=>{

    messageScreen.style.display =
    "none";

    startTurn();

});


//
// ターン開始
//
function startTurn(){

    score = 0;

    scoreEl.innerText =
    "Score : 0";

    timeLeft = 30;

    timerEl.innerText =
    timeLeft;

    gameRunning = true;

    enemies.forEach(enemy=>{

        enemy.remove();

    });

    enemies = [];

    timerInterval =
    setInterval(()=>{

        timeLeft--;

        timerEl.innerText =
        timeLeft;

        if(timeLeft <= 0){

            endTurn();
        }

    },1000);
}


//
// ターン終了
//
function endTurn(){

    clearInterval(timerInterval);

    gameRunning = false;

    scores[currentPlayer - 1] =
    score;

    currentPlayer++;

    if(currentPlayer > totalPlayers){

        showResult();

    }else{

        showPlayerStart();
    }
}


//
// 結果表示
//
function showResult(){

    resultScreen.style.display =
    "flex";

    let html = "";

    for(let i = 0;
        i < scores.length;
        i++){

        html +=
        "<h2>PLAYER " +
        (i + 1) +
        " : " +
        scores[i] +
        "</h2>";
    }

    resultText.innerHTML =
    html;
}


//
// キーボード
//
document.addEventListener(
"keydown",(e)=>{

    if(e.key === "ArrowUp"){
        up = true;
    }

    if(e.key === "ArrowDown"){
        down = true;
    }

    if(e.key === "ArrowLeft"){
        left = true;
    }

    if(e.key === "ArrowRight"){
        right = true;
    }

    if(e.code === "Space"){

        punch();
    }
});


document.addEventListener(
"keyup",(e)=>{

    if(e.key === "ArrowUp"){
        up = false;
    }

    if(e.key === "ArrowDown"){
        down = false;
    }

    if(e.key === "ArrowLeft"){
        left = false;
    }

    if(e.key === "ArrowRight"){
        right = false;
    }
});


//
// パンチボタン
//
punchButton.addEventListener(
"click",()=>{

    punch();

});


//
// プレイヤー更新
//
function updatePlayer(){

    if(up){
        playerY -= 6;
    }

    if(down){
        playerY += 6;
    }

    if(left){
        playerX -= 6;
    }

    if(right){
        playerX += 6;
    }

    if(playerX < 0){
        playerX = 0;
    }

    if(playerY < 0){
        playerY = 0;
    }

    if(playerX >
       window.innerWidth - 140){

        playerX =
        window.innerWidth - 140;
    }

    if(playerY >
       window.innerHeight - 140){

        playerY =
        window.innerHeight - 140;
    }

    player.style.left =
    playerX + "px";

    player.style.top =
    playerY + "px";
}


//
// 敵生成
//
function spawnEnemy(){

    const enemy =
    document.createElement("img");

    enemy.src =
    "images/enemy_idle.png";

    enemy.className =
    "enemy";

    enemy.x =
    window.innerWidth + 200;

    enemy.y =
    Math.random() *
    (window.innerHeight - 250);

    enemy.speed =
    3 + Math.random() * 5;

    enemy.style.left =
    enemy.x + "px";

    enemy.style.top =
    enemy.y + "px";

    game.appendChild(enemy);

    enemies.push(enemy);
}


//
// パンチ
//
function punch(){

    if(!gameRunning) return;

    if(punching) return;

    punching = true;

    player.src =
    "images/hero_punch.png";

    const punchLeft =
    playerX + 90;

    const punchRight =
    playerX + 240;

    const punchTop =
    playerY + 20;

    const punchBottom =
    playerY + 120;

    for(
        let i = enemies.length - 1;
        i >= 0;
        i--
    ){

        const enemy =
        enemies[i];

        const enemyLeft =
        enemy.x;

        const enemyRight =
        enemy.x +
        enemy.offsetWidth;

        const enemyTop =
        enemy.y;

        const enemyBottom =
        enemy.y +
        enemy.offsetHeight;

        const hit =

        punchLeft <
        enemyRight &&

        punchRight >
        enemyLeft &&

        punchTop <
        enemyBottom &&

        punchBottom >
        enemyTop;

        if(hit){

            score += 100;

            scoreEl.innerText =
            "Score : " + score;

            enemy.remove();

            enemies.splice(i,1);
        }
    }

    setTimeout(()=>{

        player.src =
        "images/hero_idle.png";

        punching = false;

    },500);
}


//
// 敵更新
//
function updateEnemies(){

    for(
        let i = enemies.length - 1;
        i >= 0;
        i--
    ){

        const enemy =
        enemies[i];

        enemy.x -= enemy.speed;

        enemy.style.left =
        enemy.x + "px";

        enemy.style.top =
        enemy.y + "px";

        if(enemy.x < -300){

            enemy.remove();

            enemies.splice(i,1);
        }
    }
}


//
// メインループ
//
function gameLoop(){

    updatePlayer();

    updateEnemies();

    requestAnimationFrame(
        gameLoop
    );
}


//
// 敵スポーン
//
setInterval(()=>{

    if(gameRunning){

        spawnEnemy();
    }

},700);


//
// 開始
//
gameLoop();
```

