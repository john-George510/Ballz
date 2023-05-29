class Block {
  constructor() {
    rectMode(CENTER);
    var loc=floor(random(10))
			while(!available[loc]){
				console.log(available[loc])
				loc=floor(random(10))
			}
    this.width = 50;
    this.x = 25+50*loc
		available[loc]=!available[loc]
    this.y = 120;
    this.points = 100;
  }
  show() {
    fill(120, 100, 100);
    rect(this.x, this.y, this.width, this.width, 3);
    noFill();
    fill(0, 100, 0);
    textSize(24);
    textAlign(CENTER);
    text(this.points, this.x, this.y + 7);
  }
  move() {
    this.y += this.width;
  }
  death(){
    if(this.y>height-50){
      blocks.splice(blocks.indexOf(this),1)
    }
  }
}
