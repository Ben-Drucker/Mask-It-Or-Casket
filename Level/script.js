//const startingMinutes = 10;
//let time = startingMinutes * 60;

//const timer = document.getElementById('timer');


/*setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    countdownEL.innerHTML = '${minutes}: ${secomds}';
    time--;
}
*/

/*
var myfunc = setInterval(function () {

    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    // Calculating minutes and seconds left
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    // Result is output to the specific element
    document.getElementById("mins").innerHTML = minutes + " : "
    document.getElementById("secs").innerHTML = seconds

    // Display the message when countdown is over
    if (timeleft < 0) {
        clearInterval(myfunc);
        document.getElementById("mins").innerHTML = ""
        document.getElementById("secs").innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP!!";
    }
}, 1000);
*/

window.onload = function () {
    var min = 10;
    var sec = 00;
    var countDownTimer = setInterval(function () {
        document.getElementById("timer").innerHTML = min + " : " + sec;
        sec--;
        if (sec == 00) {
            min--;
            sec = 60;
            if (min == 0) {
                clearInterval(countDownTimer)
                document.getElementById("end").innerHTML = "TIME'S UP!";
            }
        }
    }, 1000);
}