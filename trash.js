const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas height from its CSS value
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const basketWidth = 100;
const basketHeight = 20;
const basketSpeed = 50;
const objectSpeed = 2;

let basketX = (canvas.width - basketWidth) / 2;
const basketY = canvas.height - basketHeight - 10;

let fallingObjects = [];

const maxObjects = 10; // Maximum number of falling objects
let objectCreationDelay = 1; // Delay between object creation

document.addEventListener("keydown", moveBasket);

function moveBasket(e) {
  // Move the basket left if ArrowLeft is pressed and it's not at the left edge
  if (e.key === "ArrowLeft" && basketX > 0) {
    basketX -= basketSpeed;
  }
  // Move the basket right if ArrowRight is pressed and it's not at the right edge
  else if (e.key === "ArrowRight" && basketX < canvas.width - basketWidth) {
    basketX += basketSpeed;
  }
}

function createFallingObject() {
  if (fallingObjects.length < maxObjects) {
    // Generate a random x position for the falling object
    const x = Math.random() * (canvas.width - 10) + 5;

    // Start the falling object above the canvas
    const y = -10;

    // Add the new falling object to the array
    fallingObjects.push({ x, y });
  }
}

function updateObjects() {
  for (let i = fallingObjects.length - 1; i >= 0; i--) {
    // Move each falling object down by the objectSpeed
    fallingObjects[i].y += objectSpeed;

    // Check if the falling object touches the basket (collision detection)
    if (
      fallingObjects[i].y + 10 > basketY && // Object reaches basket Y position
      fallingObjects[i].x > basketX && // Object is within the left side of the basket
      fallingObjects[i].x < basketX + basketWidth // Object is within the right side of the basket
    ) {
      fallingObjects.splice(i, 1); // Remove the object if it hits the basket
    }

    // Remove the object if it falls off the bottom of the canvas
    if (fallingObjects[i].y > canvas.height) {
      fallingObjects.splice(i, 1);
    }
  }
}

function drawBasket() {
  ctx.fillStyle = "rgba(225, 130, 54, 2)";
  ctx.fillRect(basketX, basketY, basketWidth, basketHeight);
}

function drawObjects() {
  ctx.fillStyle = "#6A2534"; // Set the fill color for the squares

  for (const obj of fallingObjects) {
    // Draw a square instead of a circle
    ctx.fillRect(obj.x, obj.y, 10, 10);
  }
}

function gameLoop() {
  // Clear the canvas for redrawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw game objects
  updateObjects();
  drawBasket(); // Call drawBasket() here
  drawObjects(); // Call drawObjects() here

  // Randomly create new falling objects
  if (Math.random() < 0.05 && objectCreationDelay <= 0) {
    // Reduced chance of creating a new object
    createFallingObject();
    objectCreationDelay = 30; // 30 frames delay
  } else {
    objectCreationDelay--;
  }

  // Request the next frame for smooth animation
  requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", () => {
  // Get the canvas size from the CSS
  const rect = canvas.getBoundingClientRect();

  // Set the actual canvas width and height to match the CSS size
  canvas.width = rect.width;
  canvas.height = rect.height;

  // Re-center the basket when the canvas is resized
  basketX = (canvas.width - basketWidth) / 2;
});

// Start the game loop
gameLoop();

// Create some initial falling objects
for (let i = 0; i < 10; i++) {
  createFallingObject();
}
