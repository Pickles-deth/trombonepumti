console.log("Trombone Punch 起動");

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
// キー入力
//
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft") {
        moveLeft = true;
    }

    if (e.key === "ArrowRight") {
        moveRight = true;
    }

    if (e.code === "Space") {
        punch();
    }
});

document.addEventListener("keyup", (e) => {

    if (e.key === "ArrowLeft") {
        moveLeft = false;
    }

    if (e.key === "ArrowRight") {
        moveRight = false;
    }
});

//
// プレイヤー更新
//
function updatePlayer() {

    if (moveLeft) {
        playerX -= PLAYER_SPEED;
    }

    if (moveRight) {
        playerX += PLAYER_SPEED;
    }

    // 画面外制限
    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > window.innerWidth - 120) {
        playerX = window.innerWidth - 120;
    }

    player.style.left = playerX + "px";
}

//
// 敵生成
//
function spawnEnemy() {

    const enemy = document.createElement("img");

    enemy.src =
        "https://cdn-icons-png.flaticon.com/512/616/616408.png";

    enemy.className = "enemy";

    enemy.x = window.innerWidth + 100;
    enemy.y = window.innerHeight - 170;

    enemy.speed = 4 + Math.random() * 4;

    enemy.style.left = enemy.x + "px";
    enemy.style.top = enemy.y + "px";

    game.appendChild(enemy);

    enemies.push(enemy);
}

//
// アイテム生成
//
function spawnItem(isGood = true) {

    const item = document.createElement("div");

    item.className = "item";

    item.innerHTML = isGood ? "➕" : "➖";

    item.style.fontSize = "48px";

    item.good = isGood;

    item.x = window.innerWidth + 100;
    item.y = 120 + Math.random() * 300;

    item.speed = 5;

    item.style.left = item.x + "px";
    item.style.top = item.y + "px";

    game.appendChild(item);

    items.push(item);
}

//
// パンチ
//
function punch() {

    if (punching) return;

    punching = true;

    player.style.transform = "scale(1.25)";

    setTimeout(() => {

        player.style.transform = "scale(1)";

        punching = false;

    }, 100);

    enemies.forEach((enemy, index) => {

        const dx = Math.abs(enemy.x - playerX);

        // パンチ範囲
        if (dx < 150) {

            combo++;

            score += 100 * combo;

            enemy.style.transform = "scale(1.5)";
            enemy.style.opacity = "0";

            setTimeout(() => {
                enemy.remove();
            }, 100);

            enemies.splice(index, 1);

            updateUI();
        }
    });
}

//
// 敵更新
//
function updateEnemies() {

    enemies.forEach((enemy, index) => {

        enemy.x -= enemy.speed;

        enemy.style.left = enemy.x + "px";

        // プレイヤーに到達
        if (enemy.x < playerX - 40) {

            combo = 0;

            score -= 200;

            updateUI();

            enemy.remove();

            enemies.splice(index, 1);
        }

        // 画面外
        if (enemy.x < -100) {

            enemy.remove();

            enemies.splice(index, 1);
        }
    });
}

//
// アイテム更新
//
function updateItems() {

    items.forEach((item, index) => {

        item.x -= item.speed;

        item.style.left = item.x + "px";

        const dx = Math.abs(item.x - playerX);

        const dy = Math.abs(
            item.y - (window.innerHeight - 140)
        );

        // 取得判定
        if (dx < 80 && dy < 100) {

            if (item.good) {

                score += 500;

            } else {

                score -= 300;

                combo = 0;
            }

            updateUI();

            item.remove();

            items.splice(index, 1);
        }

        // 画面外
        if (item.x < -100) {

            item.remove();

            items.splice(index, 1);
        }
    });
}

//
// UI更新
//
function updateUI() {

    scoreEl.innerText = "Score : " + score;

    if (combo >= 2) {

        comboEl.innerText =
            combo + " COMBO !!";

    } else {

        comboEl.innerText = "";
    }
}

//
// メインループ
//
function gameLoop() {

    updatePlayer();

    updateEnemies();

    updateItems();

    requestAnimationFrame(gameLoop);
}

//
// スポーン
//
setInterval(() => {

    spawnEnemy();

}, 1200);

setInterval(() => {

    spawnItem(Math.random() > 0.4);

}, 3000);

//
// ゲーム開始
//
updateUI();

gameLoop();
