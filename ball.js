class Ball {
  constructor() {
    this.r = 9;
    this.reset();
    this.angle = 0;
    this.no
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
    text(balls.length,width/2,height-15)
  }
  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  edges() {
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.xspeed *= -1;
    }
    if (this.y - this.r < 40) {
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
      let dir = atan2(block.y - this.y, block.x - this.x);
      console.log("collision", dir);
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
      if (block.points<=0){
        blocks.splice(blocks.indexOf(block),1)
      }
      return true
    }
  }
  ballCollision(newBall){
    if (dist(this.x,this.y,newBall.x,newBall.y)<this.r+newBall.r){
      console.log("ball collision")
      newBalls.splice(newBalls.indexOf(newBall),1)
      let ball = new Ball();
      ball.no=balls.length+1
      balls.push(ball);
      return true
    }
  }
  death() {
    if (this.y > height) {
      available=[true,true,true,true,true,true,true,true,true,true]
      for (block of blocks) {
        block.move();
        console.log("after block", block);
      }
      for(newBall of newBalls){
        newBall.move()
      }
      newBall = new NewBall()
      newBalls.push(newBall)
      for(var i=0;i<floor(random(1,9));i++){
        block = new Block();
        blocks.push(block);
      }
      this.reset();
      console.log(balls)
    }
  }
}
