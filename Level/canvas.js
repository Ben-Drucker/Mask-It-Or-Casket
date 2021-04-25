//Setup canvas
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 750;

//Select images
const playerSprite = new Image();
playerSprite.src = "images/People.png";
const background = new Image();
background.src = "images/map.png";

//Function to draw sprites
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) { //s = source image; d = drawn image
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

//Preparing information to draw sprites on grid
let newCity = theGame.city;
var population = newCity.population;
var spritesA = [];
const gridSize = 30;
var perSprite = Math.floor(population / (gridSize * gridSize));
for (let i = 0; i < population; i += perSprite) {
    spritesA.push(newCity.citizens[i]);
}

for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
        spritesA[r * gridSize + c].x = c * spritesA[r * gridSize + c].width;
        spritesA[r * gridSize + c].y = r * spritesA[r * gridSize + c].height;
    }
}

//Draw sprites on a 30x30 grid
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
}

//Change sprites displayed on canvas
function changeStatus() {
    /**     POLICY VISUALIZATION PRIORITY
     * Dead
     * Infected
     *      Vax
     *      Mask
     *      Distance
     *      Nothing
     * Recovered
     *      Vax
     *      Mask
     *      Distance
     *      Nothing
     * Normal
     *      Vax
     *      Mask
     *      Distance
     *      Nothing
     */
    for (let i = 0; i < spritesA.length; i++) {
        if (spritesA[i].isDead) {   //DEAD
            setIcon(spritesA[i], 7);
        }
        else if(spritesA[i].isInfected){     //INFECTED
            if(spritesA[i].isVaxed){
                setIcon(spritesA[i], 4);
            }
            else if(spritesA[i].risk < theGame.city.fractionMasking){
                setIcon(spritesA[i], 9);
            }
            else if(spritesA.risk < theGame.city.fractionDistancing){
                setIcon(spritesA[i], 10);
                if(spritesA.risk < theGame.city.fractionDistancing && Math.random() < 0.5){
                    setIcon(spritesA[i], 10);
                }
            }
            else{
                setIcon(spritesA[i], 3);
            }
        }
        else if(spritesA[i].hasRecovered){   //RECOVERED
            if(spritesA[i].isVaxed){
                setIcon(spritesA[i], 5);
            }
            else if(spritesA[i].risk < theGame.city.fractionMasking){
                setIcon(spritesA[i], 8);
                if(spritesA.risk < theGame.city.fractionDistancing && Math.random() < 0.5){
                    setIcon(spritesA[i], 11);
                }
            }
            else if(spritesA.risk < theGame.city.fractionDistancing){
                setIcon(spritesA[i], 11);
            }
            else{
                setIcon(spritesA[i], 6);
            }
        }
        else{                       //NORMAL
            if(spritesA[i].isVaxed){
                setIcon(spritesA[i], 2);
            }
            else if(spritesA[i].risk < theGame.city.fractionMasking){
                setIcon(spritesA[i], 1);
                if(spritesA[i].risk < theGame.city.fractionDistancing && Math.random() < 0.5){
                    setIcon(spritesA[i], 12);
                }
            }
            else if(spritesA[i].risk < theGame.city.fractionDistancing){
                setIcon(spritesA[i], 12);
            }
            else{
                setIcon(spritesA[i], 0);
            }
        }
    }

    function setIcon(spritesA_i, pos){
        spritesA_i.frameX = pos;
    }
}