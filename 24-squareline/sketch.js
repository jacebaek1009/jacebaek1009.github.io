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
      // Swap the clicked square with the last square in the array
      const lastSquare = squares[squares.length - 1];
      squares[squares.length - 1] = squares[i];
      squares[i] = lastSquare;

      // Move the clicked square to the right side of the canvas and adjust its y position
      squares[i].x = width;
      squares[i].y -= 60;  // Move it up by 60 pixels. Adjust this value as per your requirement.
      
      // Adjust the positions of the squares to fill the gap starting from the left edge of the window
      adjustPositions();
      
      break;  // Exit the loop once positions are adjusted
    }
  }
}

function adjustPositions() {
  // Calculate the starting x position to align with the left edge of the window
  let x = 0; // This is the left edge of the window
  
  // Adjust the positions of the squares to start from the left edge of the window
  for (let i = squares.length - 1; i >= 0; i--) {
    squares[i].x = x;
    x += squares[i].size + 10; // Adjust by size + spacing for the next square
  }
}