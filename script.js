const game =
document.getElementById("game");

const scoreEl =
document.getElementById("score");

const punchButton =
document.getElementById("punchButton");


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
// 敵配列
//
let enemies = [];


//
// パンチ状態
//
let punching = false;


//
// プレイヤー移動
//
let up = false;
let down = false;
let left = false;
let right = false;


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

    //
    // スペースでパンチ
    //
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

    //
    // 画面外防止
    //
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
    document.createElement("div");

    enemy.className =
    "enemy";

    //
    // 右から出現
    //
    enemy.x =
    window.innerWidth + 100;

    //
    // ランダム高さ
    //
    enemy.y =
    Math.random() *
    (window.innerHeight - 100);

    //
    // 速度
    //
    enemy.speed =
    3 + Math.random() * 4;

    //
    // 初期位置
    //
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

    if(punching) return;

    punching = true;

    //
    // パンチ画像
    //
    player.src =
    "images/hero_punch.png";

    //
    // パンチ範囲
    //
    const punchLeft =
    playerX + 90;

    const punchRight =
    playerX + 240;

    const punchTop =
    playerY + 20;

    const punchBottom =
    playerY + 120;

    //
    // 当たり判定
    //
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
        enemy.x + 80;

        const enemyTop =
        enemy.y;

        const enemyBottom =
        enemy.y + 80;

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

            //
            // スコア
            //
            score += 100;

            scoreEl.innerText =
            "Score : " + score;

            //
            // 敵削除
            //
            enemy.remove();

            enemies.splice(i,1);
        }
    }

    //
    // パンチ終了
    //
    setTimeout(()=>{

        player.src =
        "images/hero_idle.png";

        punching = false;

    },150);
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

        //
        // 左移動
        //
        enemy.x -= enemy.speed;

        enemy.style.left =
        enemy.x + "px";

        //
        // 画面外
        //
        if(enemy.x < -100){

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

    spawnEnemy();

},700);


//
// 開始
//
gameLoop();
