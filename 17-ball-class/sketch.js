// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Ball {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color;
    this.radius = random(15, 30);
    this.dx = random(-10, 10);
    this.dy = random(-10, 10);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  move(){
    this.x += this.dx;
    this.y += this.dy;

    if(this.y - this.radius < 0 || this.y + this.radius > height){
      this.dy *= -1;
    }
    if(this.x - this.radius < 0 || this.x + this.radius > width){
      this.dx *= -1;
    }
  }
  display(){
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius*2);
  }
  bounce(otherBall){
    let radiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if(radiSum > distanceApart){
      this.r = 255;
      this.g = 0;
      this.b = 0;
      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
    }
  }

}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  let theBall = new Ball(width/2, height/2);
  ballArray.push(theBall);
}

function draw() {
  background(220);
  for(let someBall of ballArray){
    someBall.move();
    for(let otherBall of ballArray){
      if(someBall !== otherBall){
        someBall.bounce(otherBall);
      }
    }
    someBall.display();
  }
}

function mousePressed() {
  let theBall = new Ball(mouseX, mouseY);
  ballArray.push(theBall);
}
