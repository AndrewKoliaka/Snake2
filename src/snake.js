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
