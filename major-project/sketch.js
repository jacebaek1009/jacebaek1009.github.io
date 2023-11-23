// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ingredient = [];
let salmon;
let basket;
let grab = true;
let backg;
let egg;

function preload() {
  salmon = loadImage("salmon.png");
  basket = loadImage("basket.png");
  backg = loadImage("");
  egg = loadImage("egg.png");
  eggBasket = loadImage("eggbasket.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  let place = new Ingredients(mouseX, mouseY, salmon);
  ingredient.push(place);
}

function draw() {
  for(let i of ingredient) {
    i.display();
  }
  displayBasket(windowWidth/2, windowHeight/2);
}
function mousePressed() {
  let place = new Ingredients(mouseX, mouseY, salmon);
  ingredient.push(place);
}


class Ingredients {
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
  }

  display() {
    noStroke();
    fill(255, 0 , 0);
    image(this.type, this.x, this.y);
  }
}

function displayBasket(x, y) {
  image(basket, x, y);
}

class Basket {
  constructor(x, y, top, bottom, left, right){
    this.x = x;
    this.y = y;
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }
  
  isInBasket(x, y, top, bottom, left, right) {
    return x >= left && x <=right && (y <= bottom && y >= top);
  }
}
