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

// Function to draw the clock in the canvas, make a white circle
const drawClock = () => {
  drawFace();
};

// Draw the clock face
const drawFace = () => {
  let grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'White';
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'White');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
};

drawClock();
