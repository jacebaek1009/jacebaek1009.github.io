/* eslint-disable for-direction */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let cellSize;
let grid;
const GRIDSIZE = 10;



function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRIDSIZE, GRIDSIZE);

}

function draw() {
  background(220);
  displayGrid();

  if(height > width){
    cellSize = width/GRIDSIZE;
  }
  else{
    cellSize = height/GRIDSIZE;
  }
}

function displayGrid(){
  for(let y = 0; y < GRIDSIZE; y++){
    for(let x = 0; x < GRIDSIZE; x ++){
      if(grid[y][x] === 1){
        fill("white");
      }
      else if(grid[y][x] === 0){
        fill("black");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

}


function generateRandomGrid(cols, rows){
  let newArray =[];
  for(let y = 0; y < rows; y ++){
    newArray.push([]);
    for(let x = 0; x < cols; x++){
      if(random(100) < 50){
        newArray[y].push(0);
      }
      else{
        newArray[y].push(1);
      }
    }
  }
  return newArray;
}

function generateEmptyGrid(cols, rows){
  let newArray =[];
  for(let y = 0; y < rows; y ++){
    newArray.push([]);
    for(let x = 0; x < cols; x++){
      newArray[y].push(0);
    }
  }
  return newArray;
}

function keyTyped(){
  if(key === "r"){
    grid = generateRandomGrid(GRIDSIZE, GRIDSIZE);
  }
  else if(key === "e"){
    grid = generateEmptyGrid(GRIDSIZE, GRIDSIZE);
  }
}

function mousePressed(){
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x,y);
  toggleCell(x, y - 1);
  toggleCell(x, y+ 1);
  toggleCell(x + 1, y);
  toggleCell(x - 1, y);
}


function toggleCell(x,y){
  if(x < 0 && x < GRIDSIZE && y > 0 && y < GRIDSIZE){
    if (grid[y][x]===0){
      grid[y][x] = 1;
    }
    else if(grid[y][x] === 1){
      grid[y][x] = 0;
    }
  }

}