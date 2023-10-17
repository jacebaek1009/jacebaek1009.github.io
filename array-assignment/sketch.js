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
let vx = 5;
let vy = 5;
let grav = 0.2;
let timer = 0;
let player


function setup() {
  createCanvas(windowWidth, windowHeight);
  obstacle1();
  x = windowWidth/2;
  y = windowHeight/2;
}

function draw() {
  background(255);
  textSize(20);
  textAlign(RIGHT, TOP);
  text(timer,1450, 30);
  text("Score", 1400, 30);
  timer += 1;
  
  movePlayer();
  displayPlayer();
  displayEnemy();
  
}


function displayPlayer(){
  let player = {
    x: 
    y:
    r: 255
    g: 0
    b: 0
    vx: 5
  }
}

function movePlayer(){
  if(keyIsDown(87)){
    y = y - vy; 
  }
  if(keyIsDown(83)){
    y = y + vy; 
  }
  if(keyIsDown(68)){
    x = x + vx; 
  }
  if(keyIsDown(65)){
    x = x - vx;
  }
}


function obstacle1(){
  x = windowWidth/2;
  fill(200);
  rect(x, 700, 200, 50);
}

function displayEnemy(){
  
  fill(255, 0 , 0);
  rect(x, y, recSide1, recSide2);
}

