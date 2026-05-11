const game =
document.getElementById("game");

const scoreEl =
document.getElementById("score");


//
// プレイヤー
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
    window.innerWidth + 100;

    enemy.y =
    260 + Math.random() * 200;

    enemy.speed =
    6;

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
    // パンチ画像
    //
    const slide =
    document.createElement("img");

    slide.src =
    "images/slide.png";

    slide.className =
    "slide";

    const punchX =
    playerX + 120;

    const punchY =
    playerY + 30;

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
        punchX + 200 &&

        enemy.x + 80 >
        punchX &&

        enemy.y <
        punchY + 100 &&

        enemy.y + 80 >
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

    },200);
}


//
// キー入力
//
document.addEventListener(
"keydown",(e)=>{

    if(e.code === "Space"){

        punch();
    }
});


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
        // 画面外削除
        //
        if(enemy.x < -150){

            enemy.remove();

            enemies.splice(i,1);
        }
    }
}


//
// メインループ
//
function gameLoop(){

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
