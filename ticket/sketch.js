let tickets = [];
let interactionAllowed = true;
let startTime;
let ticketDelay = 3000; // 3 seconds in milliseconds

// Define an array of orders
const orders = [
  ["Tomato", "Cheese", "Mushrooms", "Pepperoni", "Onions"],
  ["Chicken", "Bacon", "Ranch", "Tomato", "Spinach"],
  ["Pepperoni", "Sausage", "Green Peppers", "Onions", "Olives"]
];

function setup() {
  createCanvas(400, 400);
  // Set the start time using millis()
  startTime = millis();
}

function draw() {
  background(220);

  // Display all order tickets
  for (let i = 0; i < tickets.length; i++) {
    tickets[i].display();
    tickets[i].update();
  }
}

function mousePressed() {
  if (interactionAllowed) {
    // Check if the mouse is pressed inside any ticket
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].contains(mouseX, mouseY) && tickets[i].canMove()) {
        tickets[i].startDragging(mouseX, mouseY);
        break; // Break the loop once we find the first ticket that was clicked
      }
    }
  }
}

function mouseReleased() {
  // When the mouse is released, stop dragging for all tickets
  for (let i = 0; i < tickets.length; i++) {
    tickets[i].stopDragging();
  }
}

function keyPressed() {
  if (key === ' ' && interactionAllowed) {
    // Select a random order index
    const orderIndex = Math.floor(random(orders.length));

    // Create a new ticket with the selected order
    const newTicket = new OrderTicket(width / 2, height / 2, 100, 50, orders[orderIndex]);
    tickets.push(newTicket);
  }
}

class OrderTicket {
  constructor(x, y, width, height, ingredients) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ingredients = ingredients;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.moveStartTime = millis();
  }

  display() {
    // Draw the ticket as a rectangle
    fill(255);
    rect(this.x, this.y, this.width, this.height);

    // Display the ingredients
    fill(0);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < this.ingredients.length; i++) {
      text(this.ingredients[i], this.x + this.width / 2, this.y + i * 15 + this.height / 2);
    }
  }

  contains(px, py) {
    return (
      px > this.x &&
      px < this.x + this.width &&
      py > this.y &&
      py < this.y + this.height
    );
  }

  canMove() {
    // Check if enough time has passed since the ticket was spawned
    return millis() - this.moveStartTime > ticketDelay;
  }

  startDragging(mx, my) {
    if (this.contains(mx, my) && this.canMove()) {
      this.dragging = true;
      this.offsetX = mx - this.x;
      this.offsetY = my - this.y;
    }
  }

  stopDragging() {
    this.dragging = false;
    // Move the ticket to the top when released
    this.y = 10;
  }

  update() {
    if (this.dragging) {
      this.x = constrain(mouseX - this.offsetX, 0, width - this.width);
      this.y = constrain(mouseY - this.offsetY, 0, height - this.height);
    }
  }
}