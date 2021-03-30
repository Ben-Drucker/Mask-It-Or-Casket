const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');

//var c = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 500;
console.log(canvas);

const keys = [];

const player = {
    x:0,
    y:0,
    width:50,
    height:50,
    frameX:3,
    frameY:0,
    speed:9,
    moving:false,
};

const playerSprite = new Image();
playerSprite.src = "images/People.png";
const background = new Image();
background.src = "images/map.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    c.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width*player.frameX, player.height*player.frameY, player.width, player.height, 0, 0, 
        player.width, player.height);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    console.log(keys);
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

function changeStatus(){
    if (keys[38]){
        player.frameX = 3;
    }
}