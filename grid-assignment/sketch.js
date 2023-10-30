// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
const GRID_SIZE = 40;
let cellSize;
let playerX = 0;
let playerY = 0;
let backgroundColor = "black";

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }


  grid[playerY][playerX] = 9;
}

function draw() {
  background(220);
  displayGrid();
}

function keyTyped() {
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "s") {
    movePlayer(0, 1);
  }
  else if (key === "w") {
    movePlayer(0, -1);
  }
  else if (key === "a"){
    movePlayer(-1, 0);
  }
  else if (key === "d"){
    movePlayer(1, 0 );
  }
  else if (key === "r"){
    backgroundColor = "red";
  }
  else if (key === "green"){
    backgroundColor ="green";
  }
  else if (key === "b"){
    backgroundColor = "brown";
  }
  else if (key === "q"){
    backgroundColor = "grey";
  }
  else if (key === "z"){
    backgroundColor = "white";
  }
  else if (key === "x"){
    backgroundColor = "black";
  }
}

function movePlayer(x,y){
  if (playerX + x >= 0 && playerX + x < GRID_SIZE && playerY + y >= 0 && playerY + y < GRID_SIZE){
    if(grid[playerY + y][playerX + x] === 0){
      let tempX = playerX;
      let tempY = playerY;
      
      playerX += x;
      playerY += y;

      grid[playerY][playerX] = 9;
      grid[tempY][tempX] = 0;
    }
  }
}


function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x, y);   //current cell
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
      else if (grid[y][x] === 2) {
        fill("red");
      }
      else if (grid[y][x] === 3) {
        fill("green");
      }
      else if (grid[y][x] === 4) {
        fill("brown");
      }
      else if (grid[y][x] === 5) {
        fill("grey");
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