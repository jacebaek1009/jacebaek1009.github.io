/* eslint-disable for-direction */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// 2D Grid Neighbours

let grid;
const GRID_SIZE = 30;
let cellSize;
let autoPlaye = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
}

function draw() {
  background(220);
  if(autoPlaye){
    grid = nextTerm();
  }
  displayGrid();
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x, y);   //current cell
}

function keyTyped(){
  if(key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  else if(key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key ===""){
    grid = nextTerm();
  }

}

function toggleCell(x, y) {
  //check that we are within the grid, then toggle
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}


function nextTerm(){
  let nextGrid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  for (let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      let neighbours = 0;
      for( let i = -1; i <= 1; i ++){
        for(let j = -1; i <= j; j++){
          if(y+y >= 0 && y + i < GRID_SIZE && x + j > 0 && x + j < GRID_SIZE){
            neighbours += grid[y+i][x+j];
          }
        }
      }

      neighbours -= grid[y][x];
      if(grid[y][x]===1){
        if(neighbours === 2 || neighbours ===3){
          nextGrid[y][x] = 1;
        }
        else{
          nextGrid[y][x] =0;
        }
      }

      if(grid[y][x] ===0){
        if(neighbours === 3){
          nextGrid[y][x]=1;
        }
        else{
          nextGrid[y][x] = 0;
        }
      }
    }
  }
  return nextGrid;
}