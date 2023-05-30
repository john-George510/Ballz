class Block {
  constructor() {
    let loc = floor(random(10));
    while (!available[loc]) {
      loc = floor(random(10));
    }
    available[loc] = false;
    this.width = 50;
    this.x = 25 + 50 * loc;
    this.y = 120;
    this.points = floor(random(balls.length, balls.length * 2 + 1));
    console.log("Block created");
  }
  show() {
    const hue = floor(map(this.points, 0, 50, 0, 255));
    fill(hue, 100, 100);
    rect(this.x, this.y, this.width, this.width, 3);
    fill(0, 100, 0);
    textSize(24);
    textAlign(CENTER,CENTER);
    text(this.points, this.x, this.y);
  }
  move() {
    this.y += this.width;
  }
  death() {
    if (this.y > height - 100) {
      game = false;
      return true;
    }
    return false;
  }
}
