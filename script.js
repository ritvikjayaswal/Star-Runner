const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 200, size: 20, dy: 0 };
let obstacles = [];
let gameOver = false;

document.addEventListener("keydown", () => {
  if (!gameOver) player.dy = -4; // Move up
});

document.addEventListener("keyup", () => {
  player.dy = 4; // Move down
});

function spawnObstacle() {
  obstacles.push({
    x: canvas.width,
    y: Math.random() * (canvas.height - 20),
    size: 20,
    speed: 3
  });
}

function update() {
  if (gameOver) return;

  player.y += player.dy;

  // Keep player inside canvas
  if (player.y < 0) player.y = 0;
  if (player.y > canvas.height - player.size)
    player.y = canvas.height - player.size;

  // Move obstacles
  obstacles.forEach(o => {
    o.x -= o.speed;

    // Collision detection
    if (
      o.x < player.x + player.size &&
      o.x + o.size > player.x &&
      o.y < player.y + player.size &&
      o.y + o.size > player.y
    ) {
      gameOver = true;
    }
  });

  // Remove off-screen obstacles
  obstacles = obstacles.filter(o => o.x + o.size > 0);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Obstacles
  ctx.fillStyle = "red";
  obstacles.forEach(o => {
    ctx.fillRect(o.x, o.y, o.size, o.size);
  });

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
  }
}

setInterval(() => {
  if (!gameOver) spawnObstacle();
}, 1000);

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
