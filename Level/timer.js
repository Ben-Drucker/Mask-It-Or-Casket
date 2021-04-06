//import {Game} from "./game.js";
var theGame = new Game(75000, 75);

window.onload = function () {
    let interIteratoryTime = 0.5 //time between iterations, in seconds.
    var min = 1;
    var sec = 10; //BUG Cannot be zero -> leads to bug
    theGame.iterateByTime(theGame.city, interIteratoryTime, (60*min + sec)/interIteratoryTime);
    var countDownTimer = setInterval(function () {
        document.getElementById("timer").innerHTML = min + " : " + sec;
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
        This may not show 00 //BUG!
        */
        else if (sec < 10) {
            sec = "0" + sec;
        }
    }, 1000);
}