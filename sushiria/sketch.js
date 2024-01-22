// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let ingredients = [];
let customerOrder = [];
let playerOrder = [];

function setup() {
  createCanvas(400, 400);

  // Initialize ingredients
  ingredients.push(createIngredient("rice", color(255, 255, 204), 50, 50));
  ingredients.push(createIngredient("nori", color(0, 102, 51), 150, 50));
  ingredients.push(createIngredient("fish", color(255, 0, 0), 250, 50));

  // Generate a random customer order
  customerOrder = generateRandomOrder();
}

function draw() {
  background(220);

  // Display ingredients
  for (let ingredient of ingredients) {
    displayIngredient(ingredient);
  }

  // Display customer order
  displayOrder(customerOrder);

  // Display player's order
  displayPlayerOrder(playerOrder);
}

function mousePressed() {
  // Check if the mouse is over an ingredient
  for (let ingredient of ingredients) {
    if (mouseOverIngredient(ingredient)) {
      playerOrder.push(ingredient.name);
    }
  }
}

function mouseDragged() {
  // Dragging the last added ingredient in the player's order
  if (playerOrder.length > 0) {
    playerOrder[playerOrder.length - 1] = mouseX;
  }
}

function mouseReleased() {
  // Check if the player's order matches the customer's order
  if (arraysEqual(playerOrder, customerOrder)) {
    console.log("Order complete! You earned a point!");
    // You can add more game logic here (e.g., increase score, generate a new order, etc.)
  } else {
    console.log("Order incorrect. Try again!");
  }

  // Clear the player's order
  playerOrder = [];
}

// Function to create an ingredient object
function createIngredient(name, color, x, y) {
  return {
    name: name,
    color: color,
    x: x,
    y: y,
    size: 50,
  };
}

// Function to check if the mouse is over an ingredient
function mouseOverIngredient(ingredient) {
  let d = dist(mouseX, mouseY, ingredient.x, ingredient.y);
  return d < ingredient.size / 2;
}

// Function to display an ingredient
function displayIngredient(ingredient) {
  fill(ingredient.color);
  ellipse(ingredient.x, ingredient.y, ingredient.size, ingredient.size);
  textAlign(CENTER, CENTER);
  fill(0);
  text(ingredient.name, ingredient.x, ingredient.y);
}

// Function to generate a random customer order
function generateRandomOrder() {
  let orderOptions = ["rice", "nori", "fish"];
  let order = [];

  for (let i = 0; i < 3; i++) {
    let randomIndex = floor(random(orderOptions.length));
    order.push(orderOptions[randomIndex]);
  }

  return order;
}

// Function to display the player's order
function displayPlayerOrder(order) {
  textAlign(LEFT, CENTER);
  fill(0);
  textSize(20);
  text("Your Order:", 20, height - 70);

  for (let i = 0; i < order.length; i++) {
    fill(getIngredientColor(order[i]));
    ellipse(150 + i * 70, height - 70, 50, 50);
    fill(0);
    text(order[i], 150 + i * 70, height - 70);
  }
}

// Function to compare two arrays for equality
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}