class Ball {
  constructor() {
    this.r = 9;
    this.reset();
    this.angle = 0;
  }
  reset() {
    this.xspeed = 0;
    this.yspeed = 0;
    this.x = width / 2;
    this.y = height - 50;
  }
  show() {
    fill(60, 100, 100);
    ellipse(this.x, this.y, this.r * 2);
    text(balls.length, width / 2, height - 15);
  }
  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  edges() {
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.xspeed *= -1;
    }
    if (this.y - this.r < 50) {
      this.yspeed *= -1;
    }
  }
  blockCollision(block) {
    if (
      this.x + this.r > block.x - block.width / 2 &&
      this.x - this.r < block.x + block.width / 2 &&
      this.y + this.r > block.y - block.width / 2 &&
      this.y - this.r < block.y + block.width / 2
    ) {
      block.points--;
      const dir = atan2(block.y - this.y, block.x - this.x);
      console.log("block collision");
      if (
        (dir < 45 && dir > -45) ||
        (dir > 135 && dir < 180) ||
        (dir > -180 && dir < -135)
      ) {
        this.xspeed *= -1;
      }
      if ((dir > 45 && dir < 135) || (dir > -135 && dir < -45)) {
        this.yspeed *= -1;
      }
      if (block.points <= 0) {
        blocks.splice(blocks.indexOf(block), 1);
      }
      return true;
    }
  }
  ballCollision(newBall) {
    if (dist(this.x, this.y, newBall.x, newBall.y) < this.r + newBall.r) {
      console.log("ball collision");
      newBalls.splice(newBalls.indexOf(newBall), 1);
      const ball = new Ball();
      balls.push(ball);
      return true;
    }
  }
  death() {
    if (this.y > height) {
      available = Array(10).fill(true);
      blocks.forEach((block) => block.move());
      newBalls.forEach((newBall) => newBall.move());
      const newBall = new NewBall();
      newBalls.push(newBall);
      for (let i = 0; i < floor(random(1, 9)); i++) {
        const block = new Block();
        blocks.push(block);
      }
      this.reset();
      console.log("next level");
      aim = true;
    }
  }
}
