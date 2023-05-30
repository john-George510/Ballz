class NewBall {
  constructor() {
    let loc = floor(random(10));
    while (!available[loc]) {
      loc = floor(random(10));
    }
    available[loc] = false;

    this.x = 25 + 50 * loc;
    this.y = 120;
    this.r = 14;
		console.log("New ball created")
  }
  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }
  move() {
    this.y += 50;
  }
  death() {
    if (this.y > height - 50) {
      newBalls.splice(newBalls.indexOf(this), 1);
    }
  }
}
