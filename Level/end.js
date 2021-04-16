function gameOver(){
    document.getElementById('endModal').style.display='block';
    document.getElementById('endModal').innerHTML = `
    <h1>Game Over</h1>
    <form id="submitScore" action="https://www.cs.swarthmore.edu/~cgalo1/071/leaderboard.php" method="post">
        Name: <input type="text" name="name">
        <input id="score" type="hidden" name="score"></input>
        <input type="button" onclick="submitScore()" value="SUBMIT">
    </form>
    <h2 id="scoreDisplay"></h2>
    `;
    document.getElementById('scoreDisplay').innerHTML = "Score: " + score;
}
function submitScore() {
    document.getElementById("score").setAttribute("value",score);
    document.getElementById("submitScore").submit();
}