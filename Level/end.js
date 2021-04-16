function gameOver(){
    document.getElementById('endModal').style.display='block';
    document.getElementById('endModal').innerHTML = `
    <form id="submitScore" action="https://www.cs.swarthmore.edu/~cgalo1/071/leaderboard.php" method="post">
        Name: <input type="text" name="name"><br>
        <input id="score" type="hidden" name="score"></input>
        <input type="button" onclick="submitScore()" value="SUBMIT">
    </form>
    `;
}
function submitScore() {
    document.getElementById("score").setAttribute("value",score);
    document.getElementById("submitScore").submit();
}