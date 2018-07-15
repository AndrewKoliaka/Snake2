// Game constants

// Directions
const RIGHT = 'Right';
const LEFT = 'Left';
const UP = 'Up';
const DOWN = 'Down';

// Game entities dimensions
const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;

// Colors
const SNAKE_COLOR = 'blue';
const FOOD_COLOR = 'red';
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

const snake = {

  // snake queue
  queue: [
    { x: 10, y: 10},
    { x: 11, y: 10},
    { x: 12, y: 10}
  ],

  // increase snake size by 1 item
  growUp(coord) {
    this.queue.push(coord)
  },

  // make step forward according to direction
  move(direction) {
    let xModifier = 0, yModifier = 0;
    switch (direction) {
      case UP: yModifier = -1; break;
      case DOWN: yModifier = 1; break;
      case LEFT: xModifier = -1; break;
      case RIGHT: xModifier = 1;
    }
    this.queue.forEach(coord => {
      coord.x += xModifier;
      coord.y += yModifier;
    });
  }
}

const view = {
  windowWidth: 0,
  windowHeight: 0,
  init() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  },
  drawBoard(ctx) {
    const colsNumber = Math.floor(this.windowWidth / CELL_WIDTH);
    const rowsNumber = Math.floor(this.windowHeight / CELL_HEIGHT);

    for(let x = 0; x < colsNumber; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_WIDTH, 0);
      ctx.lineTo(x * CELL_WIDTH, this.windowHeight);
      ctx.stroke();
    }

    for(let y = 0; y < rowsNumber; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_WIDTH);
      ctx.lineTo(this.windowWidth, y * CELL_WIDTH);
      ctx.stroke();
    }
  },
  clearBoard(ctx) {
    ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
  },
  drawCell(ctx, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
  },
  clearCell(ctx, x, y) {
    ctx.clearRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
  }
}