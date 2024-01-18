// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Square {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  draw() {
    fill('blue');
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  }

  containsPoint(px, py) {
    return px >= this.x && px <= this.x + this.size && py >= this.y && py <= this.y + this.size;
  }
}

let squares = [];

function setup() {
  createCanvas(800, 400);
  
  const numSquares = 10;
  const size = 50;
  const speed = 10;
  const spacing = size + 10;

  let x = width;

  for (let i = 0; i < numSquares; i++) {
    const square = new Square(x, height - size, size, speed);
    squares.push(square);
    x -= spacing;
  }
}

function draw() {
  background(255);
  
  for (const square of squares) {
    square.move();
    square.draw();
  }

  for (let i = 0; i < squares.length - 1; i++) {
    const currentSquare = squares[i];
    const nextSquare = squares[i + 1];
    
    const distance = nextSquare.x - (currentSquare.x + currentSquare.size);
    
    if (distance < 0) {
      nextSquare.x = currentSquare.x + currentSquare.size + 1;
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].containsPoint(mouseX, mouseY)) {
      squares[i].y -=20; // Remove the clicked square from the array
      adjustPositions(i);     // Adjust the positions of remaining squares starting from index i
      break;                // Exit the loop once a square is removed
    }
  }
}

function adjustPositions(startIndex) {
  // Calculate the new x position for the squares after the removed square
  let x = squares[startIndex].x;
  for (let i = startIndex; i < squares.length; i++) {
    squares[i].x = x;
    x += squares[i].size + 10;
  }
}