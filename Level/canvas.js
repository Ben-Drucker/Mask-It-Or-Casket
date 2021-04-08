const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 750;
console.log(canvas);

// select images
const playerSprite = new Image();
playerSprite.src = "images/People.png";
const background = new Image();
background.src = "images/map.png";

/* create Sprite class
class Sprite {
    constructor(id, x, y, frameX, frameY, status) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.frameX = frameX;
        this.frameY = 0;
        this.status = status;
    }
}
*/

// s = source image; d = drawn image
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    c.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
}
animate();

var population = 9000;
newCity = new City(population);
//create array
var spritesA = [];
console.log(spritesA);
const gridSize = 30;
var perSprite = Math.floor(population / (gridSize*gridSize));
    //fill with people
for (var i=0; i<population; i+=perSprite) {
   spritesA.push(newCity.citizens[i]);
};
console.log(spritesA);

function drawCityPop(citySprites){
    for (var i=0; i<citySprites.length; i++) {
        //if module(remainder == 0) go to next line (y axis)
        drawSprite(playerSprite, //img
            citySprites[i].x*citySprites[i].frameX, //sX
            citySprites[i].y*citySprites[i].frameY, //sY
            citySprites[i].width, //sW
            citySprites[i].height, //sH
            citySprites[i].x+ citySprites[i].width*i, //dX
            citySprites[i].y*i, //dY
            citySprites[i].width, //dW
            citySprites[i].height); //dH
     };
    requestAnimationFrame(drawCityPop);
}
drawCityPop(spritesA);

/*
//var citySprites = [];
//newCity = new City(100);
//function setupPops(){
        //citySprites.push(new Sprite(i, i*iSize, 0, 0, 0, 0));
        drawSprite(playerSprite, //img
            citySprites[i].x*citySprites[i].frameX, //sX
            citySprites[i].y*citySprites[i].frameY, //sY
            citySprites[i].width, //sW
            citySprites[i].height, //sH
            citySprites[i].x+ citySprites[i].width*i, //dX
            citySprites[i].y*i, //dY
            citySprites[i].width, //dW
            citySprites[i].height); //dH
    }
    requestAnimationFrame(setupPops); 
}
setupPops();


// assign values to dif status ex. infected = 1
/*
function changeStatus(){  
    for (var i = 0; i < population.length; i++) {
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
*/