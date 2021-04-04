
const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 500;
console.log(canvas);

const player = {
    x:0,
    y:0,
    width:50,
    height:50,
    frameX:0,
    frameY:0,
    speed:9,
    moving:false,
};

class Sprite {
    constructor(id, x, y, width, height, frameX, frameY, status) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.frameX = frameX;
        this.frameY = frameY;
        this.status = status;
    }
}

const playerSprite = new Image();
playerSprite.src = "images/People.png";
const background = new Image();
background.src = "images/map.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    c.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    //drawSprite(playerSprite, player.width*player.frameX, player.height*player.frameY, player.width, player.height, 0, 0, 
        //player.width, player.height);
    requestAnimationFrame(animate);
}
animate();

/*
var citySprites = [];
const philly = new City(10);
function setupPops(){
    var size = 50; // current sprite is 50X50 pixels
    for (var i = 0; i < philly.population; i++) {
        citySprites.push(new Sprite(i, i*size, 0, size, size, 0, 0, 0))
        c.drawSprite(playerSprite, citySprites[i].x*citySprites[i].frameX, citySprites[i].y*citySprites[i].frameY, 
            citySprites[i].width, citySprites[i].height, citySprites[i].x*i, citySprites[i].y*i, citySprites[i].width, citySprites[i].height);
    }
    requestAnimationFrame(animate); 
}
setupPops();

// assign values to dif status ex. infected = 1

function changeStatus(){  
    for (var i = 0; i < philly.population; i++) {
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