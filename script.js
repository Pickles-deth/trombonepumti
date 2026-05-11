const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");

let score = 0;

let playerX = 150;
let playerY = 300;

let up = false;
let down = false;
let left = false;
let right = false;

let punching = false;

let enemies = [];


//
// キー入力
//
document.addEventListener("keydown",(e)=>{

    if(e.key === "ArrowUp") up = true;
    if(e.key === "ArrowDown") down = true;
    if(e.key === "ArrowLeft") left = true;
    if(e.key === "ArrowRight") right = true;

    if(e.code === "Space"){
        punch();
    }
});

document.addEventListener("keyup",(e)=>{

    if(e.key === "ArrowUp") up = false;
    if(e.key === "ArrowDown") down = false;
    if(e.key === "ArrowLeft") left = false;
    if(e.key === "ArrowRight") right = false;
});


//
// プレイヤー移動
//
function updatePlayer(){

    if(up) playerY -= 6;
    if(down) playerY += 6;
    if(left) playerX -= 6;
    if(right) playerX += 6;

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
}


//
// 敵生成
//
function spawnEnemy(){

    const enemy = document.createElement("img");

    enemy.src = "image/enemy_idle.png";

    enemy.className = "enemy";

    enemy.x = window.innerWidth;
    enemy.y = Math.random() * 500 + 100;

    enemy.style.left = enemy.x + "px";
    enemy.style.top = enemy.y + "px";

    game.appendChild(enemy);

    enemies.push(enemy);
}


//
// パンチ
//
function punch(){

    if(punching) return;

    punching = true;

    player.src = "image/hero_punch.png";

    // スライド表示
    const slide = document.createElement("img");

    slide.src = "image/slide.png";

    slide.className = "slide";

    slide.style.left = (playerX + 120) + "px";
    slide.style.top = (playerY + 40) + "px";

    game.appendChild(slide);

    // 当たり判定
    for(let i = enemies.length - 1; i >= 0; i--){

        const enemy = enemies[i];

        const hitX =
            enemy.x < playerX + 320 &&
            enemy.x > playerX + 150;

        const hitY =
            enemy.y < playerY + 120 &&
            enemy.y > playerY - 50;

        // スライド先端が当たった
        if(hitX && hitY){

            score += 100;

            scoreEl.innerText =
            "Score : " + score;

            enemy.src =
            "image/enemy_hit.png";

            setTimeout(()=>{
                enemy.remove();
            },100);

            enemies.splice(i,1);
        }
    }

    setTimeout(()=>{

        slide.remove();

        player.src =
        "image/hero_idle.png";

        punching = false;

    },150);
}


//
// 敵移動
//
function updateEnemies(){

    for(let i = enemies.length - 1; i >= 0; i--){

        const enemy = enemies[i];

        enemy.x -= 5;

        enemy.style.left =
        enemy.x + "px";

        if(enemy.x < -200){

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

    requestAnimationFrame(gameLoop);
}


//
// 敵スポーン
//
setInterval(()=>{

    spawnEnemy();

},1500);


//
// 開始
//
gameLoop();
