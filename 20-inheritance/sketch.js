// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let particle;
let someConfetti;

function setup() {
  createCanvas(windowWidth, windowHeight);
  particle = new Particle(width/2, height/2);
  someConfetti = new Confetti(width/2, height/2);
}

function draw() {
  background(0);
  particle.update();
  particle.display();
  someConfetti.update();
  someConfetti.display();
}

class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  update(){
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  display() {
    circle(this.x, this.y, this.size);
  }
}

class Confetti extends Particle {
  constructor(x, y){
    super(x, y);
  }

  update() {
    super.update();
    this.size += random(-3, 10);
  }

  display() {
    square(this.x, this.y, this.size);
  }
}