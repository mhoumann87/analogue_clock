// Get the canvas element on the page
const canvas = document.querySelector('#canvas');
// Get the section under the canvas
const showTime = document.querySelector('.show-time');

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
  drawTime();
};

// Helper function to add a leading 0 before minutes
// and seconds on the "digital" clock
const addZero = time => {
  if (time < 10) {
    return `0${time.toString()}`;
  } else {
    return time.toString();
  }
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

const drawTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add the time as a "digital" clock below the canvas
  showTime.innerHTML = `<p>${hours.toString()} ${addZero(minutes)} ${addZero(
    seconds
  )}</p>`;

  // Get the positions for the hands
  hours = hours % 12;

  hours =
    hours * (Math.PI / 6) +
  minutes * (Math.PI / (6 * 60)) +
  seconds * (Math.PI / (360 * 60));
  console.log(hours);

  // Draw the hand
  drawHands(hours, radius * 0.7, radius * 0.07);

  // get the position for the  minute hand and draw it
  minutes = minutes * (Math.PI / 30) + seconds * (Math.PI / (30 * 60));
  drawHands(minutes, radius * 0.8, radius * 0.07);

  // get the position for the second hand and draw it
  seconds = seconds * (Math.PI / 30);
  drawHands(seconds, radius * 0.9, radius * 0.02);
};

const drawHands = (position, length, width) => {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 0);
  ctx.rotate(position);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-position);
};

drawClock();
