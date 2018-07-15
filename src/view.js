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