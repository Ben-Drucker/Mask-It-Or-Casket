//import {Game} from "./game.js";

window.onload = function () {
    let interIteratoryTime = 1 //time between iterations, in seconds.
    var min = 0;
    var sec = 59;
    let game = new Game(75000, 75);
    game.iterateByTime(game.city, interIteratoryTime, (60*min + sec)/interIteratoryTime);
    var countDownTimer = setInterval(function () {
        document.getElementById("timer").innerHTML = min + " : " + sec;
        sec--;
        if (sec == 00) {
            min--;
            sec = 59;
            if (min == 0) {
                clearInterval(countDownTimer)
                document.getElementById("end").innerHTML = "GAME OVER!";
            }
        }
        /* 
        To make the timer countdown 10, 09, 08, 07, ..., 01, 00 seconds
        This may not show 00 
        */
        else if (sec < 10) {
            sec = "0" + sec;
        }
    }, 1000);
}