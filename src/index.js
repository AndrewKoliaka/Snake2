document.addEventListener('keydown', keyPress)
window.onload = init;

let direction = RIGHT;
let canvas = null;
let ctx = null;
let elapsedTime = new Date(Date.now());

function init() {
  canvas = document.getElementsByClassName('app-canvas')[0];
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  ctx = canvas.getContext('2d');
  view.init();
  view.drawBoard(ctx);
  requestAnimationFrame(gameLoop)
}

function keyPress(e) {
  if (![37, 38, 39, 40].includes(e.keyCode)) return;
  direction = e.code.substr(5);
}

function gameLoop() {
  // clearOldSnake();

  const now = new Date(Date.now());
  const timeDifference = (elapsedTime.getTime() - now.getTime()) / 1000

  if(Math.abs(timeDifference) > 0.3) {
    elapsedTime = now;
    view.clearBoard(ctx);
    view.drawBoard(ctx);
    snake.move(direction);
    drawSnake();
  }

  requestAnimationFrame(gameLoop);
}

function drawSnake() {
  snake.queue.forEach(coord => {
    view.drawCell(ctx, SNAKE_COLOR, coord.x, coord.y);
  });
}
