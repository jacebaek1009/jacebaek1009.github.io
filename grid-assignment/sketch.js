// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
const GRID_SIZE = 10;
let cellSize;
let playerX = 0;
let playerY = 0;
let lastSwitchTime = 0;
let waitTime;
let goblin;
let sprite;
let frameWidth = 32;
let frameHeight = 32;
let totalFrame = 4;
let currentFrame = 0;
let animationSpeed = 5;
let bullets = []
let soldiers = [];
let soldierX; 
let soldierY;


function preload(){
  goblin = loadImage("goblin.png");
  eye = loadImage("eye.png");
  sprite = loadImage("soldierani.png");
}

function setup() {
  createCanvas(windowWidth*0.8, windowHeight*0.8);
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  frameRate(3);

  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }

  waitTime = random(6, 10)
}

function draw() {
  background(220);
  displayGrid();
  spawnBasic();
  moveEnemy();
  shootBullet();
  for (let i = 0; i < soldiers.length; i++) {
    soldierShoot(i);
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
      else if (grid[y][x] === 2) {
        fill("green");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
      
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 3) {
        let centerX = x * cellSize + cellSize / 2;
        let centerY = y * cellSize + cellSize / 2;
        imageMode(CENTER);
        image(eye, centerX, centerY, cellSize, cellSize);
      }
    }
  }

  for(let y = 0; y < GRID_SIZE; y ++){
    for(let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 6) {
        let centerX = x * cellSize + cellSize / 2;
        let centerY = y * cellSize + cellSize / 2;
        let sx = currentFrame * frameWidth;
        let sy = 0;
        image(sprite, centerX, centerY, frameWidth, frameHeight, sx, sy );

        if(frameCount % animationSpeed === 0){
          currentFrame = (currentFrame + 1 ) % totalFrame;
        }
        
      }
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


function spawnBasic(){
  if(second() > lastSwitchTime + waitTime){
    let enemyY = Math.floor(Math.random() * GRID_SIZE);
    grid[enemyY][GRID_SIZE - 1 ] = 3;
    lastSwitchTime = second();
    waitTime = random(2, 4);
    
  }
}

function moveEnemy(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if(grid[y][x] === 3){
        if(x - 1 >= 0 && grid [y][x - 1] === 0){
          grid[y][x-1] = 3;
          grid[y][x] = 0;
        }
      }
    }
  }
}

function shootBullet() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].x += bullets[i].speed;

    // Display the bullet
    fill("red");
    ellipse(bullets[i].x, bullets[i].y, bullets[i].radius * 2, bullets[i].radius * 2);

    // Remove bullets that go out of bounds
    if (bullets[i].x > width) {
      bullets.splice(i, 1);
    }
  }
}

function spawnBullet(x, y) {
  bullets.push({
    x: x,
    y: y,
    speed: 15, // Adjust the speed as needed
    radius: 5, // Adjust the bullet size as needed
  });
}

function mousePressed() {
  let y = Math.floor(mouseY / cellSize);
  let x = Math.floor(mouseX / cellSize);

  if (grid[y][x] === 6) {
    // Update the soldier's position when placing a soldier
    soldiers.push({ x: x, y: y, lastShootTime: frameCount });
    spawnBullet(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
  } else {
    // Place soldier at the clicked position
    grid[y][x] = 6;
    // Update the soldier's position when placing a soldier
    soldiers.push({ x: x, y: y, lastShootTime: frameCount });
  }
}

function soldierShoot() {
  // Check if enough time has passed since the last shoot
  if (frameCount - soldiers[index].lastShootTime >= 10) {
    spawnBullet(
      soldiers[index].x * cellSize + cellSize / 2,
      soldiers[index].y * cellSize + cellSize / 2
    );
    // Update the last shoot time for this soldier
    soldiers[index].lastShootTime = frameCount;
  }
}

