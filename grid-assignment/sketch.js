// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
const GRID_SIZE = 40;
let cellSize;
//let playerX = 30;
let playerX = 0;
let playerY = 0;
let backgroundColor = "black";
let goblin;
let worm;
let spike;
let eye;
let path;
let lastMoveTime = 0;
let speed = 100;

function preload(){
  goblin = loadImage("goblin.png");
  spike = loadImage("spike.png");
  worm = loadImage("worm.png");
  eye = loadImage("eye.png");
  path = loadJSON("path.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = path;

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
  moveEnemySlow(1, 0);
  
}

function keyTyped() {
  if (key === "g"){
    grid = generateGreenTerrain(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "s") {
    moveEnemySlow(0, 1);
  }
  else if (key === "w") {
    moveEnemySlow(0, -1);
  }
  else if (key === "a"){
    moveEnemySlow(-1, 0);
  }
  else if (key === "d"){
    moveEnemySlow(1, 0 );
  }
  else if (key === "z"){
    backgroundColor = "red";
  }
  else if (key === "x"){
    backgroundColor ="green";
  }
  else if (key === "c"){
    backgroundColor = "brown";
  }
  else if (key === "v"){
    backgroundColor = "grey";
  }
  else if (key === "b"){
    backgroundColor = "white";
  }
  else if (key === "n"){
    backgroundColor = "black";
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
    if (backgroundColor === "white") {
      grid[y][x] = 0;
    }
    else if (backgroundColor === "black") {
      grid[y][x] = 1;
    }
    else if (backgroundColor === "red") {
      grid[y][x] = 2;
    }
    else if (backgroundColor === "green") {
      grid[y][x] = 3;
    }
    else if (backgroundColor === "brown") {
      grid[y][x] = 4;
    }
    else if (backgroundColor === "grey") {
      grid[y][x] = 5;
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

function generateGreenTerrain(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(3);
    }
  }
  return newGrid;
}

function moveEnemySlow(x, y){
  if(millis() > lastMoveTime + speed){
    lastMoveTime = millis();
    if (playerX + x >= 0 && playerX + x < GRID_SIZE &&
      playerY + y >= 0 && playerY + y < GRID_SIZE) {
    
      //check if running into a wall
      if(grid[playerY][playerX + x] === 0){
        let tempX = playerX;
        let tempY = playerY;

        playerX += x;

        grid[playerY][playerX] = 2;
        grid[tempY][tempX] = 0;
      }
    }
  }
}
