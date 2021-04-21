// Setup canvas
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 750;
//console.log(canvas);

// Select images
const playerSprite = new Image();
playerSprite.src = "images/People.png";
const background = new Image();
background.src = "images/map.png";

// s = source image; d = drawn image
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// function animate(){
//     c.drawImage(background, 0, 0, canvas.width, canvas.height);
//     requestAnimationFrame(animate);
// }
// animate();

let newCity = theGame.city;
var population = newCity.population;
var spritesA = [];
const gridSize = 30;
var perSprite = Math.floor(population / (gridSize * gridSize));
for (let i = 0; i < population; i += perSprite) {
    spritesA.push(newCity.citizens[i]);
}
//console.log(spritesA);

for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
        spritesA[r * gridSize + c].x = c * spritesA[r * gridSize + c].width;
        spritesA[r * gridSize + c].y = r * spritesA[r * gridSize + c].height;
    }
}

function drawCityPop() {
    for (let i = 0; i < spritesA.length; i++) {
        drawSprite(
            playerSprite, //img
            spritesA[i].width * spritesA[i].frameX, //sX
            spritesA[i].height * spritesA[i].frameY, //sY
            spritesA[i].width, //sW
            spritesA[i].height, //sH
            spritesA[i].x, //dX
            spritesA[i].y, //dY
            spritesA[i].width, //dW
            spritesA[i].height); //dH
    }
    //requestAnimationFrame(drawCityPop);
}

function changeStatus() {
    for (let i = 0; i < spritesA.length; i++) {
        if (spritesA[i].isDead) {
            spritesA[i].frameX = 3;
        }
        else if (spritesA[i].isVaxed) {
            spritesA[i].frameX = 4;
        }
        else if (spritesA[i].isInfected) {
            spritesA[i].frameX = 2;
        }
        else if (spritesA[i].hasRecovered) {
            spritesA[i].frameX = 5;
        }
        else if (spritesA[i].risk < theGame.city.fractionMasking) {
            spritesA[i].frameX = 1;
        }
        else {
            spritesA[i].frameX = 0;
        }
    }
}