//import {Game} from "./game.js";
var theGame = new Game(75000, 75);

window.onload = function () {
    let interIteratoryTime = 0.5 //time between iterations, in seconds.
    var min = 1;
    var sec = "00"; 
    theGame.iterateByTime(theGame.city, interIteratoryTime, (60*min + sec)/interIteratoryTime);
    var countDownTimer = setInterval(function () {
        document.getElementById("timer").innerHTML = min + " : " + sec;
        console.log("Current Score:", computeScore(theGame.city.population, 60*min + sec, theGame.funds, theGame.city.numDead, theGame.city.numInfected)); //the 3000 is a "funds" placeholders.
        sec--;
        if (sec == -1 && min == 0) {
            document.getElementById("end").innerHTML = "GAME OVER!";
            clearInterval(countDownTimer);
        }
        else if (sec == -1) {
            min--;
            sec = 59;
        }
        /* 
        To make the timer countdown 10, 09, 08, 07, ..., 01, 00 seconds
        */
        else if (sec < 10) {
            sec = "0" + sec;
        }
        
    }, 1000);
}