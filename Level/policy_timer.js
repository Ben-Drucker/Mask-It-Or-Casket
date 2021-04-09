//import {Game} from "./game.js";
var theGame = new Game(75000, 75);

window.onload = function () {
    let interIteratoryTime = 0.5 //time between iterations, in seconds.
    var min = 0;
    var sec = 25; 
    theGame.iterateByTime(theGame.city, interIteratoryTime, (60*min + sec)/interIteratoryTime);
    var countDownTimer = setInterval(function () {
        document.getElementById("policy_timer").innerHTML = min + " : " + sec;
        sec--;
        if (sec == -1 && min == 0) {
            document.getElementById("done_implementing").innerHTML = "DONE";
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