// Get the canvas element on the page
const canvas = document.querySelector('#canvas');

// Set canvas up to use a 2D drawing object
const ctx = canvas.getContext('2d');

// Calculate the radius, using canvas height
const radius = canvas.height / 2;

// Change the x and y coordinates to the middle of the canvas
ctx.translate(radius, radius);
