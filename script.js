console.log("GAME START");

const game = document.getElementById("game");
const player = document.getElementById("player");

const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");

let score = 0;
let combo = 0;

let playerX = 200;

let moveLeft = false;
let moveRight = false;

let punching = false;

const PLAYER_SPEED = 8;

let enemies = [];
let items = [];


//
// キーボード
//
document.addEventListener("keydown",(e)=>{

    if(e.key === "ArrowLeft"){
        moveLeft = true;
    }

    if(e.key === "ArrowRight"){
        moveRight = true;
    }

    if(e.code === "Space"){
        punch();
    }
});

document.addEventListener("keyup",(e)=>{

    if(e.key === "ArrowLeft"){
        moveLeft = false;
    }

    if(e.key === "ArrowRight"){
        moveRight = false;
    }
});


//
// プレイヤー更新
//
function updatePlayer(){

    if(moveLeft){
        playerX -= PLAYER_SPEED;
    }

    if(moveRight){
        playerX += PLAYER_SPEED;
    }

    if(playerX < 0){
        playerX = 0;
    }

    if(playerX > window.innerWidth - 180){
        playerX = window.innerWidth - 180;
    }

    player.style.left = playerX + "px";
}


//
// 敵生成
//
function spawnEnemy(){

    const enemy = document.createElement("img");

    enemy.src = "assets/enemy_idle.png";

    enemy.className = "enemy";

    enemy.x = window.innerWidth + 100;
    enemy.y = window.innerHeight - 200;

    enemy.speed = 5 + Math.random() * 3;

    enemy.style.left = enemy.x + "px";
    enemy.style.top = enemy.y + "px";

    game.appendChild(enemy);

    enemies.push(enemy);
}


//
// アイテム生成
//
function spawnItem(){

    const item = document.createElement("img");

    item.src = "assets/item_good.png";

    item.className = "item";

    item.x = window.innerWidth + 100;
    item.y = 150 + Math.random() * 250;

    item.speed = 4;

    item.style.left = item.x + "px";
    item.style.top = item.y + "px";

    game.appendChild(item);

    items.push(item);
}


//
// パンチ
//
function punch(){

    if(punching) return;

    punching = true;

    player.src = "assets/hero_punch.png";

    // パンチ画像
    const punchImg = document.createElement("img");

    punchImg.src = "assets/punch.png";

    punchImg.className = "punch";

    punchImg.style.left =
        (playerX + 120) + "px";

    punchImg.style.top =
        (window.innerHeight - 170) + "px";

    game.appendChild(punchImg);

    // 当たり判定
    for(let i = enemies.length - 1; i >= 0; i--){

        const enemy = enemies[i];

        const dx =
          Math.abs(enemy.x - (playerX + 140));

        if(dx < 140){

            combo++;

            score += 100 * combo;

            enemy.src =
              "assets/enemy_hit.png";

            enemy.style.transform =
              "scale(1.3)";

            updateUI();

            setTimeout(()=>{

                enemy.remove();

            },100);

            enemies.splice(i,1);
        }
    }

    setTimeout(()=>{

        punchImg.remove();

        player.src = "assets/hero_idle.png";

        punching = false;

    },120);
}


//
// 敵更新
//
function updateEnemies(){

    for(let i = enemies.length - 1; i >= 0; i--){

        const enemy = enemies[i];

        enemy.x -= enemy.speed;

        enemy.style.left = enemy.x + "px";

        // 接触
        if(enemy.x < playerX){

            combo = 0;

            score -= 200;

            updateUI();

            enemy.remove();

            enemies.splice(i,1);
        }

        // 画面外
        if(enemy.x < -200){

            enemy.remove();

            enemies.splice(i,1);
        }
    }
}


//
// アイテム更新
//
function updateItems(){

    for(let i = items.length - 1; i >= 0; i--){

        const item = items[i];

        item.x -= item.speed;

        item.style.left = item.x + "px";

        const dx =
          Math.abs(item.x - playerX);

        if(dx < 100){

            score += 500;

            updateUI();

            item.remove();

            items.splice(i,1);
        }

        if(item.x < -100){

            item.remove();

            items.splice(i,1);
        }
    }
}


//
// UI更新
//
function updateUI(){

    scoreEl.innerText =
      "Score : " + score;

    if(combo >= 2){

        comboEl.innerText =
          combo + " COMBO!";

    }else{

        comboEl.innerText = "";
    }
}


//
// メインループ
//
function gameLoop(){

    updatePlayer();

    updateEnemies();

    updateItems();

    requestAnimationFrame(gameLoop);
}


//
// スポーン
//
setInterval(()=>{

    spawnEnemy();

},1200);

setInterval(()=>{

    spawnItem();

},5000);


//
// 開始
//
updateUI();

gameLoop();
