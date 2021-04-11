//import {Game} from "./game.js";
var theGame = new Game(75000, 75);

window.onload = function () {
    let interIteratoryTime = 0.5 //time between iterations, in seconds.
    var min = 0;
    var sec = "10"; 
    theGame.iterateByTime(theGame.city, interIteratoryTime, (60*min + parseInt(sec))/interIteratoryTime);
    var countDownTimer = setInterval(function () {
        document.getElementById("timer").innerHTML = min + " :" + sec;
        console.log("Current Score:", computeScore(theGame.city.population, 60*min + parseInt(sec), theGame.funds, theGame.city.numDead, theGame.city.numInfected));
        sec--;
        if (sec == -1 && min == 0) {
            document.getElementById("end").innerHTML = "GAME";
            document.getElementById("end").innerHTML += "&nbsp;";
            document.getElementById("end").innerHTML += "OVER!";
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