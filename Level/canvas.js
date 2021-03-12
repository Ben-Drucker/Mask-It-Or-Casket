var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 500;
console.log(canvas);

const player = {
    x:0,
    y:0,
    //width:?,
    //height:?,
    frameX:0,
    frameY:0,
    speed:9,
    moving:false,
}

//const playerSprite = new Image();
//playerSprite.src = "image name";
const background = new Image();
background.src = "images/map.png";

function animate(){
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate)
}
animate();