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
    playerX =
    Math.max(
        0,
        Math.min(
            window.innerWidth - 120,
            playerX
        )
    );

    playerY =
    Math.max(
        0,
        Math.min(
            window.innerHeight - 120,
            playerY
        )
    );

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

    // 右端から出現
    enemy.x =
    window.innerWidth + 100;

    // ランダムY
    enemy.y =
    Math.random() *
    (window.innerHeight - 100);

    // ランダム速度
    enemy.speed =
    3 + Math.random() * 5;

    // 初期位置
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

    player.src =
    "images/hero_punch.png";

    //
    // パンチ範囲
    //
    const punchX =
    playerX + 180;

    const punchY =
    playerY + 40;

    //
    // パンチ画像
    //
    const slide =
    document.createElement("img");

    slide.src =
    "images/slide.png";

    slide.className =
    "slide";

    slide.style.position =
    "absolute";

    slide.style.width =
    "180px";

    slide.style.left =
    punchX + "px";

    slide.style.top =
    punchY + "px";

    game.appendChild(slide);

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

        const hit =

        enemy.x <
        punchX + 180 &&

        enemy.x + 70 >
        punchX &&

        enemy.y <
        punchY + 80 &&

        enemy.y + 70 >
        punchY;

        if(hit){

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

    //
    // パンチ終了
    //
    setTimeout(()=>{

        slide.remove();

        player.src =
        "images/hero_idle.png";

        punching = false;

    },250);
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

        // 左へ移動
        enemy.x -= enemy.speed;

        // 更新
        enemy.style.left =
        enemy.x + "px";

        enemy.style.top =
        enemy.y + "px";

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
        gameLoop
    );
}


//
// 敵スポーン
//
setInterval(()=>{

    spawnEnemy();

},800);


//
// 開始
//
gameLoop();
