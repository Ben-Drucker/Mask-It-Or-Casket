//import {Game} from "./game.js";
//var theGame = new Game(75000, 75);

var i = 0;
function progress_move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("progress_track");
    var width = 0;
    var id = setInterval(frame, 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        elem.innerHTML = "done implementing!";
        //elem.style.width = width + "%";
        //elem.innerHTML = width  + "%";
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
    }
  }
}