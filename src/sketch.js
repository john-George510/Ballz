let myInterval;

function setup() {
  createCanvas(500, 800);
  colorMode(HSB);
  rectMode(CENTER);
  angleMode(DEGREES);
  startGame();
}

function draw() {
  background(0);
  if (!game) {
    fill(200, 0, 100);
    textSize(32);
    text("GAME OVER", width / 2, height / 2);
    console.log("game over");
  } else {
    if (aim && isMouseWithinBounds()) {
      drawAimBalls();
    }
    drawHeader();
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.show();
      ball.update();
      ball.edges();
      for (let j = 0; j < blocks.length; j++) {
        const block = blocks[j];
        block.show();
        if (ball.blockCollision(block)) {
          break;
        }
        if (block.death()) {
          return;
        }
      }
      for (let j = 0; j < newBalls.length; j++) {
        const newBall = newBalls[j];
        newBall.show();
        if (ball.ballCollision(newBall)) {
          break;
        }
        newBall.death();
      }
      ball.death();
    }
  }
}

function mouseClicked() {
  if (isMouseWithinBounds()) {
    for (ball of balls) {
      ball.angle = ang;
    }
    index = 0;
    myInterval = setInterval(shoot, 100);
  }
}

function shoot() {
  aim = false;
  if (index < balls.length) {
    if (balls[index].angle > 0) {
      balls[index].xspeed = -5 * abs(cos(balls[index].angle));
    } else if (balls[index].angle < 0) {
      balls[index].xspeed = 5 * abs(cos(balls[index].angle));
    }
    balls[index].yspeed = -abs(5 * sin(balls[index].angle));
    console.log("ball shot", index);
    index++;
  } else {
    clearInterval(myInterval);
  }
}

function startGame() {
  balls = [];
  blocks = [];
  newBalls = [];
  available = Array(10).fill(true);
  aim = true;
  game = true;
  const ball = new Ball();
  balls.push(ball);
  for (var i = 0; i < floor(random(1, 9)); i++) {
    const block = new Block();
    blocks.push(block);
  }
  const newBall = new NewBall();
  newBalls.push(newBall);
  console.log("Game started");
}

function isMouseWithinBounds() {
  if (mouseX > 0 && mouseX < width && mouseY > 50 && mouseY < height - 50) {
    return true;
  }
  return false;
}

function drawAimBalls() {
  push();
  const no = floor(dist(width / 2, height - 50, mouseX, mouseY) / 18);
  ang = atan((mouseY - (height - 50)) / (mouseX - width / 2));
  for (let i = 1; i <= no; i++) {
    const aimBall = new Ball();
    aimBall.r = 5;
    if (ang > 0) {
      aimBall.x -= cos(ang) * i * 18;
    } else {
      aimBall.x += cos(ang) * i * 18;
    }
    aimBall.y -= abs(sin(ang) * i * 18);
    aimBall.show();
  }
  pop();
}

function drawHeader() {
  fill(130, 100, 100);
  rect(width / 2, 20, 500, 50);
  push();
  fill(255);
  textSize(32);
  textStyle(BOLD);
  text("Ballz", width / 2, 30);
  pop();
}
