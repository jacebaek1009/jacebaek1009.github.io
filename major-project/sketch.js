// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ingredient = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  let place = new Ingredients(mouseX, mouseY, 10);
  ingredient.push(place);
}

function draw() {
  for(let i of ingredient) {
    i.display();
  }
}
function mousePressed() {
  let place = new Ingredients(mouseX, mouseY, 10);
  ingredient.push(place);
}


class Ingredients {
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    noStroke();
    fill(255, 0 , 0);
    circle(this.x, this.y, this.size);
  }
}