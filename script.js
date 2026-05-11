const game =
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
