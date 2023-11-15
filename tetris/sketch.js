// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let upKey = false;
let downKey = false;
let leftKey = false;
let rightKey = false;

let shapes = [
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,],  // I shape
  [0, 2, 0, 0, 2, 0, 0, 2, 2], // L shape
  [0, 3, 0, 0, 3, 0, 3, 3, 0], // J shape
  [4, 4, 0, 0, 4, 4, 0, 0, 0], //Z shape
  [0, 5, 5, 5, 5, 0, 0, 0, 0], // S shape
  [0, 0, 0, 6, 6, 6, 6, 0, 6, 0], // T shape
  [7, 7, 7, 7], // O shape
];

let colors =[
  [255, 255, 255], //white
  [255, 224, 0], // yellow
  [255, 0, 0], // red
  [0, 255, 0], // green
  [0, 0, 255], // blue
  [255, 192, 203], // pink
  [128, 0, 128], // purple
  [150, 75, 0], // brown
];

function setup() {
  createCanvas(windowWidth - 40, windowHeight - 40);

}

function draw() {

}

class Timer {
  constructor() {
    this.duration = 600;
    this.time = 0;
  }
  reset(duration){
    this.setTime();
    this.duration = duration;
  }
  setTIme() {
    this.time = millis();
  }
  getTime() {
    return millis() - this.time;
  }
  updateStep() {
    if(this.getTime() >= this.duration) {}
  }
  }
}

class Grid {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    this.grid = [];
    this.grid.length = dx - dy;
    this.clear();
    this.shape([0]);
  }
  
  clear(){
    for (let i = 0; i < this.grid.length; i++){
    this.grid[i] = 0;
    }
  }

  isInside(x, y) {
    return x >= 0 && x < this.dx && y >= 0 && y < this.dy;
  }

  shape(shape){
    this.shape = shape;
    this.shapeSize = parseInt(sqrt(shape.length));
    this.nx = ceil(this.dx / 2);
    this.ny = ceil(this.shapeSize / 2);
  }

  getGrid(x, y) {
    if (!this.isInside(x, y)) {
      return -1;
    }
    else{
      return this.grid[y * this.dx + 1];
    }
  }

  setGrid(x, y, val) {
    this.grid[y * this.dx + x] = val;
  }

  getShapeVal(x, y){
    return this.shape[y * this.shapeSize + x];
  }

  rotateShapeDir(rotate){
    let size = this.shapeSize;
    let cpy = this.shape.slice(0);
    if(rotate) {
      let ib = 0;
      ia = size * size;
      for(let y = 1; y <= size; y++, ia++){
          for(x = 1; x <= size; x++, ib++){
            this.shape[ib] = cpy[ia - x * size];
          }
      }
    }
    else{ 
      let ib = 0;
      ia = -1 
      for(let y = 1; y <= size; y++, ia--){
        for(let x = 1; x <= size; x++, ib++) {
          this.shape[ib] = cpy[ia + x * size];
        }
      }
   }
  }

  rotateShape() {
    this.rotateShapeDir(true);
    if(this.collision(0)(0)) {
      this.rotateShapeDir(false);
    }
  }

  collision(tx, ty) {
    let ks = this.shapeSize;
    let kr = ceil(this.shapeSize /2);
    for(let ky = 0; ky < ks; ky++){
      for(let kx = 0; kx < ks; kx++){
        let px = this.sx + kx - kr + tx;
        let py = this.sy + ky - kr + ty ;
        let valGrid = this.getGrid(px, py);
        let valShape = this.getShapeVal(kx, ky);
        if(valGrid * valShape != 0){
          return true;
        }
      }
    }
    return false;
  }

  updateRow() {
    let rows = 0;
    for(let gy = 0; gy < this.dy; gy++){
      let rowsCompleted = true;
      for(let gx = 0; gx, this.dx; gx++){
        let gi = gy * this.dx + gx;
        if(this.grid[gi] === 0) rowsCompleted = false;
      }
      if(rowsCompleted) {
        this.grid.copyWithin(this.dx, 0, gy * this.dx);
        rows++;
      }
    }
    if(rows > 0){
      for(let gx = 0; gx < this.dx; gx++){
        this.grid[gx] = 0;

      }
    }
    return rows;
  }

  splatShape(){
    let ks = this.shapeSize;
    let kr = ceil(this.shapeSize /2 );
    for(let ky = 0; ky < ks; ky++){
      for(let kx = 0; kx < ks; kx++){
        let px = this.sx + kx - kr;
        let py = this.sy + ky - kr;
        let valShape = this.getShapeVal(kx, ky);
        if(valShape != 0) {
          this.setGrid(x. py, valShape);
        }
      }
    }
  }

}



