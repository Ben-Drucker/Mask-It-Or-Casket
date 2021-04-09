// Setup canvas
const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 750;
console.log(canvas);

// Select images
const playerSprite = new Image();
playerSprite.src = "images/People.png";
const background = new Image();
background.src = "images/map.png";

// s = source image; d = drawn image
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    c.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
}
animate();

newCity = theGame.city;
var population = newCity.population;
var spritesA = [];
const gridSize = 30;
var perSprite = Math.floor(population / (gridSize*gridSize));
for (let i=0; i<population; i+=perSprite) {
   spritesA.push(newCity.citizens[i]);
};
console.log(spritesA);

 for(let r= 0; r<gridSize; r++){
     for(let c=0; c<gridSize; c++){
         spritesA[r*gridSize+c].x = c*spritesA[r*gridSize+c].width;
         spritesA[r*gridSize+c].y = r*spritesA[r*gridSize+c].height;
     }
 }

function drawCityPop(){
    for (let i=0; i<spritesA.length; i++) {
        drawSprite(
            playerSprite, //img
            spritesA[i].width*spritesA[i].frameX, //sX
            spritesA[i].height*spritesA[i].frameY, //sY
            spritesA[i].width, //sW
            spritesA[i].height, //sH
            spritesA[i].x, //dX
            spritesA[i].y, //dY
            spritesA[i].width, //dW
            spritesA[i].height); //dH
     };
    requestAnimationFrame(drawCityPop);
}
drawCityPop();

function changeStatus(){
    for (let i = 0; i < population.length; i++) {






        if (philly.citizens[i].isInfected = false) {
            citySprites[i].frameX = 0;
        }
        if (philly.citizens[i].isInfected = true) {
            citySprites[i].frameX = 1;
        }
        if (philly.citizens[i].isDead = false) {
            citySprites[i].frameX = 2;
        }
        if (philly.citizens[i].isDead = true) {
            citySprites[i].frameX = 3;
        }
        if (philly.citizens[i].isVaxed = false) {
            citySprites[i].frameX = 4;
        }
        if (philly.citizens[i].isVaxed = true) {
            citySprites[i].frameX = 5;
        }
    }
}