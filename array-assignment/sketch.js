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
let timer = 0;



function setup() {
  createCanvas(windowWidth, windowHeight);
  obstacle1();
}

function draw() {
  textSize(20);
  textAlign(RIGHT, TOP);
  text(timer,1450, 30);
  text("Score", 1400, 30);
  timer += 1;
  
  displayPlayer();
  displayEnemy();
  
}


function displayPlayer(){
  x = windowWidth/2;
  y = windowHeight - recSide2;
  fill(0);
  rect(x, y, recSide1, recSide2);
}

function keyIsDown(){ 

}

function obstacle1(){
  x = windowWidth/2;
  fill(200);
  rect(x, 700, 200, 50);
}

function displayEnemy(){
  x = 200;
  y = windowHeight - recSide2;
  fill(255, 0 , 0);
  rect(x, y, recSide1, recSide2);
}

