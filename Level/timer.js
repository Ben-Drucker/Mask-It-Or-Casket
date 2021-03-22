window.onload = function () {
    var min = 9;
    var sec = 59;
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