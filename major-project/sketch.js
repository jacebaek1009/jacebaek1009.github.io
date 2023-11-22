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

function preload() {
  salmon = loadImage("salmon.png");
  basket = loadImage("basket.png");
  backg = loadImage("")
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