<?php
header('Access-Control-Allow-Origin: *');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db = new SQLite3('MIOC-Leaderboard.db');

if ($_REQUEST["type"] == "insert"){
  $stm = $db->prepare("INSERT INTO leaderboard(name, score, date) VALUES (?, ?, ?)");
  $stm->bindParam(1, $_REQUEST["name"]);
  $stm->bindParam(2, $_REQUEST["score"]);
  $stm->bindParam(3, $time);

  $time = date("Y-m-d H:i:s"); //YYYY-MM-DD HH:MM:SS.SSS "ISO 8601"

  $stm->execute();

  echo $_REQUEST["name"] , "<br>" , $time;
} 
elseif ($_REQUEST["type"] == "retrieve") {
  $res = $db->query('SELECT * FROM leaderboard ORDER BY score DESC');
  while ($row = $res->fetchArray()) {
    echo "<div class=\"grid-item\">{$row[0]}</div>
    <div class=\"grid-item\">{$row[1]}</div>
    <div class=\"grid-item\">{$row[2]}</div>";
  }
}
?>