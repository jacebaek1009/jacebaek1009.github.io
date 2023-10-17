// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mario;

function preLoad(){
  mario = loadImage("mario2.png");
     
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(mario, mouseX, mouseY,);
}
