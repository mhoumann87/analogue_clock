// Get the canvas element on the page
const canvas = document.querySelector('#canvas');

// Set canvas up to use a 2D drawing object
const ctx = canvas.getContext('2d');

// Get the middle of the canvas based on height
const halfHeight = canvas.height / 2;

// Change the x and y coordinates to the middle of the canvas
ctx.translate(halfHeight, halfHeight);

// Set the radius to 90% of halfHeight, so we can fit the clock in the canvas
const radius = halfHeight * 0.9;

// Function to draw the clock in the canvas, using the functions for
// drawing the single elements
const drawClock = () => {
  drawFace();
  drawNumbers();
};

// Draw the clock face
const drawFace = () => {
  // We use the grad variable to add gradient for the circle around the
  // clock face
  let grad;
  // Drawing of the clock face
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'White';
  ctx.fill();
  // Create the outside circle and add the gradient color to it
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'White');
  grad.addColorStop(1, '#333');
  // Add the gradient to the circle and draw it
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  //add the inner black circle to the face
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
};

const drawNumbers = () => {
  // Variables to keep track of angle and numbers;
  let angle;
  let number;
  // set the font and how to draw the numbers
  // TODO change Arial to the Roboto font from google
  ctx.font = `${radius * 0.15}px arial`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  // For loop to add the numbers to the clock
  for (number = 1; number < 13; number++) {
    angle = (number * Math.PI) / 6;
    ctx.rotate(angle);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-angle);
    ctx.fillText(number.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-angle);
  }
};

drawClock();
