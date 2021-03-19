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
    }, 1000);
}