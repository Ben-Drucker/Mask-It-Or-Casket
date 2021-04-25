var endMessage = "" //for undefined losing reasons

function gameOver(){
    closeOthers(0);
    document.getElementById('endModal').style.display='block';
    if (theGame.won == false){ // TESTING: Change this when you need to win or lose
        endModalPrint()
    }
    else {
        document.getElementById('endModal').innerHTML = '<h1 id="gameOver">Game Over!</h1>';
        if (endMessage) {
            document.getElementById('endModal').innerHTML += "<h2>"+endMessage+"</h2>";
        }
    }
}
// function submitScore() {
//     document.getElementById("score").setAttribute("value",score);
//     document.getElementById("submitScore").submit(); //
// }

function submitScore() {
    var xhttp = new XMLHttpRequest();
    var username = document.getElementById('name').value;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          if (this.responseText == "0") {
            endModalPrint();
            document.getElementById("submitResponse").innerHTML = "Try something shorter";
          } else{
            document.getElementById("submitScore").innerHTML = "Your Score has been submitted";
            document.getElementById("submitResponse").innerHTML = this.responseText;
          }
      }
    };
    xhttp.open("POST", "https://www.cs.swarthmore.edu/~cgalo1/071/leaderboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name="+username+"&score="+score+"&type=insert");
}

function endModalPrint(){
    document.getElementById('endModal').innerHTML = `
    <h1>You did it!</h1>
    <form id="submitScore" onkeypress="return event.keyCode != 13">
        Name: <input type="text" id="name">
        <input type="button" onclick="submitScore()" value="SUBMIT">
    </form>
    <h2 id="scoreDisplay"></h2>
    <div id="submitResponse"></div>
    `;
    document.getElementById('scoreDisplay').innerHTML = "Score: " + score;
}
