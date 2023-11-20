// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let fireworks = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(let i = fireworks.length -1; i >= 0; i--){
    let particle = fireworks[i];
    particle.circle();
    if(particle.isDead()){
      fireworks.splice(i, 1);
    }
    else{
      particle.display();
    }
  }
}

function mousePressed() {
  for(let i = 0; i < 100; i++){
    let dx = random(-5, 5);
    let dy = random(-5, 5);
    let someParticle = new Particle(mouseX, mouseY, dx, dy);
    fireworks.push(someParticle);
  }
}

class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.alpha = 255;
    this.radius = 5;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius*2);
  }

  isDead(){
    return alpha <= 0;
  }

  circle(){
    let dx = this.dx;
    let dy = this.dy;
    let angle = atan2(dy, dx);
    this.x += cos(angle) * this.dx;
    this.y += sin(angle) * this.dy;
  }
}