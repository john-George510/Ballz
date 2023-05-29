let balls = [];
let blocks = [];
let newBalls=[]
let available=[true,true,true,true,true,true,true,true,true,true]
let ang = 0;
let aim = false;
let index = 0;
let myInterval;

function setup() {
  createCanvas(500, 800);
  colorMode(HSB);
  rectMode(CENTER);
  angleMode(DEGREES);
  stroke(255, 100, 50);
  ball = new Ball();
  ball.no = 1;
  balls.push(ball);
  block = new Block();
  blocks.push(block);
  newBall = new NewBall()
  newBalls.push(newBall)
}

function draw() {
  background(0);
  line(width / 2, height - 50, mouseX, mouseY);
  fill(150, 100, 100);
  rect(width / 2, 20, 500, 40);
  mouseClicked;
  if (index>=balls.length){
    clearInterval(myInterval)
  }
  for (ball of balls) {
    ball.show();
    ball.update();
    ball.edges();
    for (block of blocks) {
      block.show();
      if (ball.blockCollision(block)){
        break
      }
      ball.death()
    }
    for(newBall of newBalls){
      newBall.show()
      if (ball.ballCollision(newBall)){
        break
      }
      newBall.death()
    }
    ball.death();
  }
}
function mouseClicked() {
  ang = atan((mouseY - (height - 50)) / (mouseX - width / 2));
  for (ball of balls) {
    ball.angle=ang;
  }
  myInterval=setInterval(shoot,100)
  index=0
}

function shoot() {
    if (balls[index].angle > 0) {
      balls[index].xspeed = -5 * abs(cos(balls[index].angle));
    } else if (balls[index].angle < 0) {
      balls[index].xspeed = 5 * abs(cos(balls[index].angle));
    }
    balls[index].yspeed = -abs(5 * sin(balls[index].angle));
    console.log(balls[index].angle,index)
    index++;
}
function myTimer() {
  const date = new Date();
  document.getElementById("demo").innerHTML = date.toLocaleTimeString();
}