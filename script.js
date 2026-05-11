const game =
document.getElementById("game");

const scoreEl =
document.getElementById("score");

const punchButton =
document.getElementById("punchButton");


//
// 主人公生成
//
const player =
document.createElement("img");

player.id = "player";

player.src =
"images/hero.png";

let playerX = 150;
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
// 入力
//
let up = false;
let down = false;
let left = false;
let right = false;


//
// 敵配列
//
let enemies = [];


//
// パンチ状態
//
let punching = false;


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

    // 画面制限
    if(playerX < 0){
        playerX = 0;
    }

    if(playerX >
       window.innerWidth - 120){

        playerX =
        window.innerWidth - 120;
    }

    if(playerY < 0){
        playerY = 0;
    }

    if(playerY >
       window.innerHeight - 120){

        playerY =
        window.innerHeight - 120;
    }

    player.style.left =
    playerX + "px";

    player.style.top =
    playerY + "px";
}


//
// 敵生成
//
function updateEnemies(){

    for(
        let i = enemies.length - 1;
        i >= 0;
        i--
    ){

        const enemy =
        enemies[i];

        // 左へ移動
        enemy.x -= enemy.speed;

        // 位置更新
        enemy.style.left =
        enemy.x + "px";

        enemy.style.top =
        enemy.y + "px";

        // 左画面外
        if(enemy.x < -150){

            enemy.remove();

            enemies.splice(i,1);
        }
    }
}


//
// パンチ
//
function punch(){

    if(punching) return;

    punching = true;

    player.src =
    "images/hero_punch.png";

    // スライド画像
    const slide =
    document.createElement("img");

    slide.src =
    "images/slide.png";

    slide.className =
    "slide";

    slide.style.left =
    (playerX + 80) + "px";

    slide.style.top =
    (playerY + 20) + "px";

    game.appendChild(slide);

    //
    // 当たり判定
    //
    for(let i =
        enemies.length - 1;
        i >= 0;
        i--){

        const enemy =
        enemies[i];

        const hitX =

        enemy.x <
        playerX + 260 &&

        enemy.x >
        playerX + 100;

        const hitY =

        enemy.y <
        playerY + 100 &&

        enemy.y >
        playerY - 50;

        if(hitX && hitY){

            score += 100;

            scoreEl.innerText =
            "Score : " + score;

            enemy.src =
            "images/enemy_hit.png";

            setTimeout(()=>{

                enemy.remove();

            },100);

            enemies.splice(i,1);
        }
    }

    setTimeout(()=>{

        slide.remove();

        player.src =
        "images/hero.png";

        punching = false;

    },150);
}


//
// 敵更新
//
function updateEnemies(){

    for(let i =
        enemies.length - 1;
        i >= 0;
        i--){

        const enemy =
        enemies[i];

        // 左移動
        enemy.x -= enemy.speed;

        enemy.style.left =
        enemy.x + "px";

        // 画面外
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
    gameLoop);
}


//
// 敵スポーン
//
setInterval(()=>{

    spawnEnemy();

},1200);


//
// 開始
//
gameLoop();
