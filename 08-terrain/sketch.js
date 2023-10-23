// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let terrain = [];
let xOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangle();
}

function draw() {
  background(220);
  
  if (keyIsDown(RIGHT_ARROW)){
    if(xOffset < 10000){
      xOffset += 100;
    }
  }
  
  if(keyIsDown(LEFT_ARROW)){
    if(xOffset > 100){
      xOffset -= 100;
    }
  }
  displayRectangle();
}

function displayRectangle(){
  for(let i = xOffset; i < width + xOffset; i++){
    let thisRect = terrain[i];
    rect(thisRect.x - xOffset, height - thisRect.height, 1, thisRect.height);
  }
}

function spawnRectangle(){
  let time = 0;
  for(let x = 0; x < 10000; x++){
    let h = noise(time) * height;
    let thisRect = {
      x:x,
      height:h,
    };
    terrain.push(thisRect);
    time += 0.002;

  }
}