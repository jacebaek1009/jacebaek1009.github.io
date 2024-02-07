let ticket;
let dragging = false;
let hangTicket = false;
let interactionAllowed = false;
let startTime;
let offsetX, offsetY;

function setup() {
  createCanvas(400, 400);
  // Create a new ticket object with 5 different ingredients
  const ingredients = ["Tomato", "Cheese", "Mushrooms", "Pepperoni", "Onions"];
  ticket = new OrderTicket(width / 2, height / 2, 100, 50, ingredients);
  // Set the start time using millis()
  startTime = millis();
}

function draw() {
  background(220);

  // Display the order ticket
  ticket.display();

  if (interactionAllowed) {
    // If interaction is allowed, check for dragging
    if (dragging) {
      // Update the ticket position based on mouse movement
      ticket.x = constrain(mouseX - offsetX, 0, width - ticket.width);
      ticket.y = constrain(mouseY - offsetY, 0, height - ticket.height);
    }

    if (hangTicket) {
      // If hanging, move the ticket to the top of the screen
      ticket.moveTicketToTop();
    }
  }

  // Check if 8 seconds have passed
  if (millis() - startTime > 8000) {
    // Enable interaction after 8 seconds
    interactionAllowed = true;
  }
}

function mousePressed() {
  if (interactionAllowed) {
    hangTicket = false;
    // Check if the mouse is pressed inside the ticket
    if (
      mouseX > ticket.x &&
      mouseX < ticket.x + ticket.width &&
      mouseY > ticket.y &&
      mouseY < ticket.y + ticket.height
    ) {
      dragging = true;

      // Calculate the offset between the mouse position and the center of the ticket
      offsetX = mouseX - (ticket.x + ticket.width / 2);
      offsetY = mouseY - (ticket.y + ticket.height / 2);
    }
  }
}

function mouseReleased() {
  if (interactionAllowed) {
    // When the mouse is released, stop dragging and set hangTicket to true
    hangTicket = true;
    dragging = false;
  }
}

class OrderTicket {
  constructor(x, y, width, height, ingredients) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ingredients = ingredients;
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

  moveTicketToTop() {
    // Move the ticket to the top of the screen
    this.y = 10;
  }
}