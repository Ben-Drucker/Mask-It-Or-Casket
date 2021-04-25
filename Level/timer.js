//import {Game} from "./game.js";
var theGame = new Game(75000, 75);
var score;

window.onload = function () {
    theGame.interIteratoryTime = 0.5; //time between iterations, in seconds.
    document.getElementById("funds").innerHTML = theGame.funds;
    var min = 1;
    var sec = "30";
    theGame.secs = 60 * min + parseInt(sec);
    theGame.secondsRemaining = theGame.secs;
    theGame.iterateByTime(theGame.city, theGame.interIteratoryTime, (theGame.secs) / theGame.interIteratoryTime);
    onTimerChange();
    var countDownTimer = setInterval(function () {
        onTimerChange();
    }, 1000);

    function onTimerChange(){
        document.getElementById("timer").innerHTML = min + " : " + sec;
        score = computeScore(theGame.city.population, 60 * min + parseInt(sec), theGame.funds, theGame.city.numDead, theGame.city.numInfected, theGame.city.numVaxed);
        //console.log("Current Score: " + score);
        sec--;
        theGame.secondsRemaining--;
        if (sec == -1 && min == 0 || theGame.hasEnded) {
            endMessage = "Your time ran out!"
            gameOver();
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

    }
}