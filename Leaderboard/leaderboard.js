function getLeaderboard() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("leaderboard").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "https://www.cs.swarthmore.edu/~cgalo1/071/leaderboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("type=retrieve");
}