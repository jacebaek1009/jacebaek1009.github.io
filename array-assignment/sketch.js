// Tag
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let score = 0;
let life = "alive";
let recSide1 = 25;
let recSide2 = 25;
let x;
let y;
let vx;
let vy;
let grav = 0.2;



function setup() {
  createCanvas(windowWidth, windowHeight);
  x = windowWidth/2;
  y = windowHeight;
}

function draw() {
  background(220);
  displayPlayer();
}


function displayPlayer(){
  fill(0);
  rect(x, y - recSide2, recSide1, recSide2);
}

function keyIsDown(){ 

}

