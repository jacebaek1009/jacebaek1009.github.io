// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let angle = 0;
let radius = 200;
let ballSize = 50;

function setup() {
  // Create a canvas
  createCanvas(800, 600);
}

function draw() {
  // Set background to white
  background(255);
  
  // Calculate the position of the ball in a circular motion
  let x = width / 2 + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  
  // Draw the ball
  fill(255, 0, 0);  // Red color
  ellipse(x, y, ballSize, ballSize);  // Draw the ball
  
  // Update the angle for next frame to make the ball move in a circular path
  angle += 10000000;  // You can adjust the speed by changing this value
  console.log(angle);
}