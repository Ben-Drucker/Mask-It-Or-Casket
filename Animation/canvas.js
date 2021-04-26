//Setup canvas
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 750;

//Select images
const germ = new Image();
germ.src = "images/People.png";
//onst background = new Image();
//background.src = "images/map.png";

//Function to draw sprites
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) { //s = source image; d = drawn image
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}