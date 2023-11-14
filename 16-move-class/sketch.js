// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walk {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.speed =  5;
    this.color = color;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
  }

  move() {
    let theChoice = random(100);
    if (theChoice < 25) {
      this.y += this.speed;
    }
    else if (theChoice < 50){
      this.y -= this.speed;
    }
    else if (theChoice < 75){
      this.x -= this.speed;
    }
    else{
      this.x += this.speed;
    }
  }

}

// let eva;
// let jace;

let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  let eva = new Walk(width/2 , height/2, "pink");
  walkers.push(eva);
  // jace = new Walk(width/3, height/3, "blue");
}

function draw() {
  for (let person of walkers) {
    person.move();
    person.display();
  }
  // jace.move();
  // jace.display();
}


function mousePressed(){
  let eva = new Walk(mouseX , mouseY, "pink");
  walkers.push(eva);
}
