class NewBall{
	constructor(){
		var loc=floor(random(10))
		console.log(available[loc])
		while(!available[loc]){
			console.log(available[loc])
			loc=floor(random(10))
		}
		this.x=25+50*loc
		available[loc]=!available[loc]
		this.y=120
		this.r=14
	}
  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }
  move() {
    this.y += 50;
  }
	death(){
		if(this.y>height-50){
      newBalls.splice(newBalls.indexOf(this),1)
    }
	}
}