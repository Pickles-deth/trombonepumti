let players = [];
}

function moveLeft() {
  velocity = -6;
}

function moveRight() {
  velocity = 6;
}

function stopMove() {
  velocity = 0;
}

function punch() {

  let distance = Math.abs((heroX + 120) - enemyX);

  if (distance < 120) {

    score += 10;

    enemy.style.transform = "translateX(40px) rotate(10deg)";

    setTimeout(() => {
      enemy.style.transform = "translateX(0px) rotate(0deg)";
    },150);

  } else {

    score -= 3;
  }

  if (Math.abs(heroX - itemX) < 60) {

    if (itemType === "good") {

      score += 15;
      alert("⭐ GOOD ITEM!");

    } else {

      score -= 10;
      alert("☠️ 唾を踏んだ！");
    }

    spawnItem();
  }

  scoreText.innerText = `Score: ${score}`;
}

function spawnItem() {

  itemX = 0;

  if (Math.random() > 0.5) {

    itemType = "good";
    item.src = "images/item_good.png";

  } else {

    itemType = "bad";
    item.src = "images/spit.png";
  }
}

function showResult() {

  let result = players
    .map((s,i) => `PLAYER ${i+1}: ${s}`)
    .join("\n");

  alert("🏆 RESULT\n\n" + result);

  location.reload();
}
