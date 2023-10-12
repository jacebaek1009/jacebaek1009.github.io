// Perlin noise ball
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
  window.setInterval(spawnBall, 1);
}

function draw() {
  noStroke();

  for (let theBall of ballArray){
    fill(theBall.color);
    theBall.x = noise(theBall.time) * width;
    theBall.y = noise(theBall.time + 300) * height;
  
    circle(theBall.x, theBall.y, theBall.size);
  
    theBall.time += 0.01;
  }
}


function spawnBall(){
  let ball = {
    x: random(width),
    y: random(height),
    size: random(10, 50),
    color: color(random(255),random(255),random(255),random(255),random(255)),
    time: random(1000),
  };
  ballArray.push(ball);
}
function mousePressed(){
  spawnBall();
}