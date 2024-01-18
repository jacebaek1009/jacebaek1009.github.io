// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let baskets = [];
let pickedSquare = null;
let placedSquares = [];

function setup() {
  createCanvas(400, 400);

  // Create three baskets
  baskets.push(new Basket(width / 4, height / 2, 50, color(255, 0, 0)));
  baskets.push(new Basket(width / 2, height / 2, 50, color(0, 255, 0)));
  baskets.push(new Basket((3 * width) / 4, height / 2, 50, color(0, 0, 255)));
}

function draw() {
  background(220);

  // Display all baskets
  for (let basket of baskets) {
    basket.display();
  }

  // Display all placed squares
  for (let square of placedSquares) {
    square.display();
  }

  if (pickedSquare) {
    pickedSquare.update(mouseX, mouseY);
    pickedSquare.display();
  }
}

function mousePressed() {
  let pickedFromBasket = false;

  // Check each basket
  for (let basket of baskets) {
    // Check if the mouse is inside a basket
    if (basket.contains(mouseX, mouseY)) {
      if (!pickedSquare) {
        // If inside a basket and not holding a square, pick it up
        pickedSquare = new Square(basket.x, basket.y, 30, basket.color);
        pickedFromBasket = true;
      } else {
        // If holding a square and clicked on another basket, release and pick up from the new basket
        pickedSquare.release();
        pickedSquare = new Square(basket.x, basket.y, 30, basket.color);
        pickedFromBasket = true;
      }
      break; // Stop checking other baskets
    }
  }

  // If outside all baskets or not picked from any basket, release the square if holding one
  if (!pickedFromBasket && pickedSquare) {
    pickedSquare.release();
    placedSquares.push(pickedSquare);
    pickedSquare = null;
  }
}

class Square {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isPicked = true;
  }

  update(x, y) {
    if (this.isPicked) {
      this.x = x;
      this.y = y;
    }
  }

  display() {
    fill(this.color);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  release() {
    this.isPicked = false;
  }
}

class Basket {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  contains(x, y) {
    return (
      x > this.x - this.size / 2 &&
      x < this.x + this.size / 2 &&
      y > this.y - this.size / 2 &&
      y < this.y + this.size / 2
    );
  }

  display() {
    fill(this.color);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
}