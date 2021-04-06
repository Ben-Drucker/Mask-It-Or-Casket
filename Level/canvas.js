//import * as city from "../engine.js"
var population = [];

// create Person class
class Person {
    constructor(id, sick) {
        this.id = id;
        this.sick = sick;
        //this.age = age;
        //this.isInfected = false;
        //this.isDead = false;
        //this.risk = risk;
        //this.iterationDeathDay = null;
        //this.willDie = null;
        //this.isVaxed = false;
    }
}

// populate pseudo city
for (var i = 0; i < 10; i++) {
    var sick;
    if (i % 2 == 0) {//Math.random() > 0.5) {
        sick = true;
    }
    else {
        sick = false;
    }
    population.push(new Person(i, sick));
}

// check people
for (let i = 0; i < 10; i++) {
console.log(population[i]);
}

const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 500;
console.log(canvas);

/*
const player = {
    x:0,
    y:0,
    width:50,
    height:50,
    frameX:0,
    frameY:0,
    //speed:9,
    //moving:false,
};
*/

// select images
const playerSprite = new Image();
playerSprite.src = "images/People.png";
const background = new Image();
background.src = "images/map.png";

// create Sprite class
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

// s = source image; d = drawn image
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    c.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    //drawSprite(playerSprite, player.width*player.frameX, player.height*player.frameY, 
    //player.width, player.height, 0, 0, 
        //player.width, player.height);
    requestAnimationFrame(animate);
}
animate();

var citySprites = [];
const philly = new City(10);
function setupPops(){
    var size = 50;
    for (var i = 0; i < population.length; i++) { //philly.population; i++) {
        if (population[i].sick = true) {
            var frameX = 0;
        }
        else {
            var frameX = 1;
        }
        citySprites.push(new Sprite(i, i*size, 0, frameX, 0, 0))
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