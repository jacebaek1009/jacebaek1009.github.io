// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cellSize;
let grid;            
const GRID_SIZE = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height > width){
    cellSize = width/GRID_SIZE;
  }
  else{
    cellSize = height/GRID_SIZE;
  }
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if(grid[y][x] === 0){
        fill("white");
      }
      if(grid[y][x] === 1){
        fill("black");

      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed(){
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  if(grid[y][x] === 0){
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1){
    grid[y][x] = 0;
  }
}