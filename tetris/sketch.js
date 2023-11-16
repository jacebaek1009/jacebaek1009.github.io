// Jace Baek
// Mr.Schellenberg
//Period 3
// November 15th 2023
//Purpose; To create a grid based game using 2d Arrays. 
//Requirements completed; 2d Arrays done, Though I have implemented the requirments for this assignment I was unable to get the game working by the due date. The intention was to create tetris using 2d arrays but was unable to get the game working. I used this tutotrial to help me. https://www.youtube.com/watch?v=wlZRCH3yMl8&t=435s. Some of the errors in the console I could not figure out how to fix as I followed the tutorial to complete this assignment. I might be able to use this as a base to complete my major assignment as most of the basics are there. 
//Extra for experts attempted. Some of the extra things I have implemented into my code is for example, ParseInt. What this does is parses a string and returns it as an integer.

// Define variables for key inputs and game objects
let upKey = false;
let downKey = false;
let leftKey = false;
let rightKey = false;
let tetris;

// Define shapes for the Tetris game
let shapes = [
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],  // I shape
  [0, 2, 0, 0, 2, 0, 0, 2, 2], // L shape
  [0, 3, 0, 0, 3, 0, 3, 3, 0], // J shape
  [4, 4, 0, 0, 4, 4, 0, 0, 0], // Z shape
  [0, 5, 5, 5, 5, 0, 0, 0, 0], // S shape
  [0, 0, 0, 6, 6, 6, 6, 0, 6, 0], // T shape
  [7, 7, 7, 7], // O shape
];

// Define a monochrome palette and colored palette for shapes
let paletteMono = [];
let colors = [
  [255, 255, 255], // white
  [255, 224, 0], // yellow
  [255, 0, 0], // red
  [0, 255, 0], // green
  [0, 0, 255], // blue
  [255, 192, 203], // pink
  [128, 0, 128], // purple
  [150, 75, 0], // brown
];

// Setup function to initialize the Tetris game
function setup() {
  createCanvas(windowWidth - 40, windowHeight - 40);

  // Initialize Tetris game, timer, and set the frame rate
  tetris = new Tetris(10, 20);
  tetris.timer = new Timer();
  frameRate(60);
  // Initialize monochrome palette
  paletteMono = [];
  for (let i = 0; i < colors.length; i++) {
    let rgb = colors[i];
    let gray = (rgb[0] + rgb[1] + rgb[2]) / 3; // Compute grayscale value
    paletteMono[i] = [255 * gray, 255 * gray, 255 * gray];
  }
}

// Function to handle user input and apply changes to the game
function applyInput(newDelay) {
  if (tetris.tGrid.pause) return;
  if (upKey) tetris.tetris.rotate = true;
  if (downKey) tetris.tetris.ty = +1;
  if (leftKey) tetris.tetris.tx = -1;
  if (rightKey) tetris.tetris.tx = +1;
  tetris.timer.reset(newDelay);
}

// Function to handle key presses
function keyPressed() {
  if (keyCode == 32) tetris.pause = !tetris.pause;
  if (keyCode == 13) tetris.tetris.restart = true;
  upKey |= keyCode === UP_ARROW;
  downKey |= keyCode === DOWN_ARROW;
  leftKey |= keyCode === LEFT_ARROW;
  rightKey |= keyCode === RIGHT_ARROW;
  applyInput(200);
}

// Function to handle key releases
function keyReleased() {
  upKey ^= keyCode === UP_ARROW;
  downKey ^= keyCode === DOWN_ARROW;
  leftKey ^= keyCode === LEFT_ARROW;
  rightKey ^= keyCode === RIGHT_ARROW;
}

// Class representing the Tetris game
class Tetris {
  constructor(dx, dy) {
    this.tGrid = new Grid(dx, dy);
    this.timer = new Timer();
    this.restartGame();
    this.shapeNext = undefined;
    this.pickNextShape();
  }

  restartGame() {
    this.tGrid.clearGrid();
    this.restart = false;
    this.pause = false;
    this.gameOver = false;
    this.spawn = true;
    this.rotate = false;
    this.tx = this.ty = 0;
    this.level = 1;
    this.rowsPerLevel = 5;
    this.rowsCompleted = 0;
    this.shapesCount = 0;
    this.timer.reset(600);
  }

  pickNextShape() {
    this.shapeCurr = this.shapeNext;
    let indexNext = parseInt(random(shapes.length));
    this.shapeNext = shapes[indexNext].slice();
  }

  update() {
    // Restarts the game if needed
    if (this.restart) {
      this.restartGame();
    }

    // If the game is paused, do nothing
    if (this.pause) {
      return;
    }

    // Spawn a new shape if needed
    if (this.spawn) {
      this.pickNextShape();
      this.tGrid.setShape(this.shapeCurr);
      this.shapesCount++;
      this.spawn = false;
    }

    // Update game level and timer duration
    this.level += floor(this.rowsCompleted / this.rowsPerLevel);
    this.rowsCompleted %= this.rowsPerLevel;
    this.timer.duration = ceil(800 / sqrt(this.level));

    // Check for game over
    this.gameOver = this.tGrid.collision(0, 0);
    if (this.gameOver) {
      return;
    }

    // Rotate the shape if needed
    if (this.rotate) this.tGrid.rotateShape();
    // Move the shape horizontally if there's no collision
    if (!this.tGrid.collision(this.tx, 0)) this.tGrid.sx += this.tx;
    // Move the shape vertically if there's no collision
    if (!this.tGrid.collision(0, this.ty)) this.tGrid.sy += this.ty;

    // Update the timer and move the shape down if needed
    if (this.timer.updateStep()) {
      if (this.ty == 0) {
        this.tGrid.sy++;
      }
    } else {
      this.tGrid.splatShape();
      this.rowsCompleted += this.tGrid.updateRows();
      this.spawn = true;
    }

    // Reset flags
    this.rotate = false;
    this.tx = this.ty = 0;
  }

  display(canvas) {
    // Display the game elements on the canvas

    // Set up variables for canvas dimensions and offsets
    let off, x, y, w, h, cell;
    let canvasW = canvas.width;
    let canvasH = canvas.height;
    off = 40;
    h = canvasH - 2 * off;
    w = canvasW - 2 * off;
    cell = ceil(min(w / this.tGrid.dx, h / this.tGrid.dy));
    w = this.tGrid.dx * cell;
    h = this.tGrid.dy * cell;
    x = parseInt((canvasW - w) / 2.0);
    y = parseInt((canvasH - h) / 2.0);
    canvas.background(50);
    canvas.strokeWeight(1);
    canvas.noStroke();
    canvas.fill(16);
    canvas.rect(x - 4, y - 4, w + 8, h + 8);
    canvas.fill(32);
    canvas.rect(x - 1, y - 1, w + 3, h + 3);

    // Display the game grid
    let colors = this.pause || this.gameOver ? paletteMono : colors;
    this.displayGrid(canvas, x, y, w, h, colors);

    // Display the next shape
    {
      let _w = x - 2 * off;
      let _h = canvasH - 2 * off;
      let _y = off;
      let _x = off + x + w;
      this.displayNextShape(canvas, _x, _y, _w, _h);
    }

    // Display game title
    {
      let ty = off + 32;
      let tx = x + w + x / 2;
      let txtTitle = "TETRIS GAME";
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.textSize(32);
      canvas.fill(200);
      canvas.text(txtTitle, tx, ty);
    }

    // Display game information (level, progress, shapes)
    {
      let y = canvasH / 2 - 150;
      let tx1 = x + w + x / 2;
      let txtLevel = "LEVEL " + this.level;
      let txtProgress = "ROW " + this.rowsCompleted + "/" + this.rowsPerLevel;
      let txtShapes = "SHAPE " + this.shapesCount;
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.fill(200);
      canvas.textSize(24);
      canvas.text(txtLevel, tx1, y);
      canvas.fill(96);
      canvas.textSize(16);
      canvas.text(txtProgress, tx1, (y += 24));
      canvas.text(txtShapes, tx1, (y += 16));
    }

    // Display game status (Game Over, Pause)
    let txtGameStatus = undefined;
    if (this.gameOver) txtGameStatus = "GAME OVER";
    if (this.pause) txtGameStatus = "PAUSE";
    if (txtGameStatus !== undefined) {
      canvas.textSize(144);
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.fill(0);
      canvas.text(txtGameStatus, canvasW / 2 + 2, canvasH / 2 + 1);
      canvas.fill(255, 224, 0);
      canvas.text(txtGameStatus, canvas / 2, canvasH / 2);
    }

    // Display controls
    {
      let ty = canvasH - 6 * 15 - off;
      let tx1 = x + w + 40;
      let tx2 = tx1 + 70;
      canvas.textAlign(LEFT);
      canvas.noStroke();
      canvas.textSize(14);
      canvas.fill(96);
      canvas.text("UP", tx1, ty);
      canvas.text("- ROTATE", tx2, ty);
      ty += 15;
      canvas.text("LEFT", tx1, ty);
      canvas.text("- MOVE LEFT", tx2, ty);
      ty += 15;
      canvas.text("RIGHT", tx1, ty);
      canvas.text("- MOVE RIGHT", tx2, ty);
      ty += 15;
      canvas.text("DOWN", tx1, ty);
      canvas.text("- MOVE DOWN", tx2, ty);
      ty += 25;
      canvas.text("SPACE", tx1, ty);
      canvas.text("- PAUSE", tx2, ty);
      ty += 15;
      canvas.text("ENTER", tx1, ty);
      canvas.text("- RESTART", tx2, ty);
      ty += 15;
    }
  }

  displayGrid(pg, x, y, w, h, colors) {
    // Display the game grid on the canvas

    let dx = this.tGrid.dx;
    let dy = this.tGrid.dy;
    let cw = w / dx;
    let ch = h / dy;

    // Draw the grid cells
    for (let gy = 0; gy < dy; gy++) {
      for (let gx = 0; gx < dx; gx++) {
        let cx = x + gx * cw;
        let cy = y + gy * ch;
        pg.stroke(44);
        if ((gx & 1) == 1) {
          pg.fill(66);
        } else {
          pg.fill(77);
        }
        pg.rect(cx, cy, cw, ch);
      }
    }

    // Draw the filled cells based on the game grid
    for (let gy = 0; gy < dy; gy++) {
      for (let gx = 0; gx < dx; gx++) {
        let cx = x + gx * cw;
        let cy = y + gy * ch;
        let valGrid = this.tGrid.getGrid(gx, gy);
        if (valGrid > 0) {
          pg.stroke(0);
          let rgb = colors[valGrid % colors.length];
          pg.fill(rgb[0], rgb[1], rgb[2]);
          pg.rect(cx, cy, cw, ch);
        }
      }
    }

    // Draw the current falling shape
    let ks = this.tGrid.shapeSize;
    let kr = ceil(this.tGrid.shapeSize / 2.0);
    for (let ky = 0; ky < ks; ky++) {
      for (let kx = 0; kx < ks; kx++) {
        let gx = this.tGrid.sx + kx - kr;
        let gy = this.tGrid.sy + ky - kr;
        let cx = x + gx * cw;
        let cy = y + gy * ch;
        let valShape = this.tGrid.getShapeVal(kx, ky);
        if (valShape != 0) {
          pg.stroke(0);
          let rgb = colors[valShape % colors.length];
          pg.fill(rgb[0], rgb[1], rgb[2]);
          pg.rect(cx, cy, cw, ch);
        }
      }
    }
  }

// Function to display the next shape in a given p5.js graphics context
displayNextShape(pg, x, y, w, h) {
  // Extract information about the next shape
  let shape = this.shapeNext;
  let shapeSize = parseInt(sqrt(shape.length));
  let ks = shapeSize;
  let kr = shapeSize / 2.0;

  // Calculate cell width and height for drawing the shape
  let cw = min(w / 5.0, h / 5.0);
  let ch = cw;

  // Loop through each cell in the shape and draw it on the graphics context
  for (let ky = 0; ky < ks; ky++) {
    for (let kx = 0; kx < ks; kx++) {
      let gx = kx - kr;
      let gy = ky - kr;
      let cx = x + gx * cw + w / 2.0;
      let cy = y + gy * ch + h / 2.0;

      // Determine the value of the cell in the shape
      let valShape = shape[ky * shapeSize + kx];

      // Set fill color based on the cell value
      if (valShape != 0) {
        pg.fill(200); // Filled color for non-empty cell
      } else {
        pg.fill(32); // Filled color for empty cell
      }

      pg.stroke(64); // Stroke color for the cell border
      pg.rect(cx, cy, cw, ch); // Draw the cell rectangle
    }
  }
}
}

// Class representing a timer
class Timer {
  constructor() {
    this.duration = 600; // Default duration in milliseconds
    this.time = 0; // Initial time
  }

  // Reset the timer with a new duration
  reset(duration) {
    this.setTime();
    this.duration = duration;
  }

  // Set the current time
  setTime() {
    this.time = millis();
  }

  // Get the elapsed time since the last set time
  getTime() {
    return millis() - this.time;
  }

  // Check if the timer has completed its duration
  updateStep() {
    if (this.getTime() >= this.duration) {
      this.setTime();
      return true; // Timer has completed
    }
    return false; // Timer is still running
  }
}

// Class representing a grid
class Grid {
  constructor(dx, dy) {
    // Initialize grid properties
    this.dx = dx;
    this.dy = dy;
    this.grid = [];
    this.grid.length = Math.max(0, dx * dy);
    this.clear();
    this.shape([0]);
  }

  // Clear the grid by setting all cells to 0
  clear() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = 0;
    }
  }

  // Check if a given coordinate is inside the grid
  isInside(x, y) {
    return x >= 0 && x < this.dx && y >= 0 && y < this.dy;
  }

  // Set the current shape and update related properties
  shape(shapeArray) {
    this.shape = shapeArray;
    this.shapeSize = parseInt(sqrt(shapeArray.length));
    this.nx = ceil(this.dx / 2);
    this.ny = ceil(this.shapeSize / 2);
  }

  // Get the value of a cell in the grid at a given position
  getGrid(x, y) {
    if (!this.isInside(x, y)) {
      return -1; // Invalid position
    } else {
      return this.grid[y * this.dx + x];
    }
  }

  // Set the value of a cell in the grid at a given position
  setGrid(x, y, val) {
    this.grid[y * this.dx + x] = val;
  }

  // Get the value of a cell in the current shape at a given position
  getShapeVal(x, y) {
    return this.shape[y * this.shapeSize + x];
  }

  // Rotate the current shape in a specified direction
  rotateShapeDir(rotate) {
    let size = this.shapeSize;
    let cpy = this.shape.slice(0);

    if (rotate) {
      let ib = 0;
      let ia = size * size;

      for (let y = 1; y <= size; y++, ia++) {
        for (let x = 1; x <= size; x++, ib++) {
          this.shape[ib] = cpy[ia - x * size];
        }
      }
    } else {
      let ib = 0;
      let ia = -1;

      for (let y = 1; y <= size; y++, ia--) {
        for (let x = 1; x <= size; x++, ib++) {
          this.shape[ib] = cpy[ia + x * size];
        }
      }
    }
  }

  // Rotate the current shape and check for collisions
  rotateShape() {
    this.rotateShapeDir(true);
    if (this.collision(0, 0)) {
      this.rotateShapeDir(false);
    }
  }

  // Check for collisions between the current shape and the grid
  collision(tx, ty) {
    let ks = this.shapeSize;
    let kr = ceil(this.shapeSize / 2);

    for (let ky = 0; ky < ks; ky++) {
      for (let kx = 0; kx < ks; kx++) {
        let px = this.sx + kx - kr + tx;
        let py = this.sy + ky - kr + ty;
        let valGrid = this.getGrid(px, py);
        let valShape = this.getShapeVal(kx, ky);

        if (valGrid * valShape !== 0) {
          return true; // Collision detected
        }
      }
    }
    return false; // No collision
  }

  // Update the grid by removing completed rows
  updateRows() {
    let rows = 0;

    for (let gy = 0; gy < this.dy; gy++) {
      let rowsCompleted = true;

      for (let gx = 0; gx < this.dx; gx++) {
        let gi = gy * this.dx + gx;
        if (this.grid[gi] === 0) rowsCompleted = false;
      }

      if (rowsCompleted) {
        this.grid.copyWithin(this.dx, 0, gy * this.dx);
        rows++;
      }
    }

    if (rows > 0) {
      for (let gx = 0; gx < this.dx; gx++) {
        this.grid[gx] = 0;
      }
    }

    return rows;
  }

  // Place the current shape in the grid
  splatShape() {
    let ks = this.shapeSize;
    let kr = ceil(this.shapeSize / 2);

    for (let ky = 0; ky < ks; ky++) {
      for (let kx = 0; kx < ks; kx++) {
        let px = this.sx + kx - kr;
        let py = this.sy + ky - kr;
        let valShape = this.getShapeVal(kx, ky);

        if (valShape !== 0) {
          this.setGrid(px, py, valShape);
        }
      }
    }
  }
}

