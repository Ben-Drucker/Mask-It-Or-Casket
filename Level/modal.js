// var bar = new ProgressBar.Line(container, {
//     strokeWidth: 4,
//     easing: 'easeInOut',
//     duration: 1400,
//     color: '#FFEA82',
//     trailColor: '#eee',
//     trailWidth: 1,
//     svgStyle: {width: '100%', height: '100%'},
//     from: {color: '#FFEA82'},
//     to: {color: '#ED6A5A'},
//     step: (state, bar) => {
//       bar.path.setAttribute('stroke', state.color);
//     }
//   });
//
// bar.animate(1.0);

function clickedYes(option, modal, cost, maxCost, time) {
  let intensity = cost/maxCost;
  theGame.implementPolicy(option, cost, intensity, time);
  document.getElementById(modal).style.display='none';
}


function closeOthers(modalNum){
  if (document.getElementById('endModal').style.display != 'block') { // If game going, close other modals when opening another
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
    if (modalNum){
      document.getElementById(modalNum).style.display='block';
    }
  } else { // If game ended, only allow homeModal to display over endModal
    if (modalNum == 'homeModal'){
      document.getElementById(modalNum).style.display='block';
    }
  }
}

  // get modal
//var modal = document.getElementById("myModal");

// get button to open
//var btn = document.getElementById("myBtn");

//get close button
//var close = document.getElementsByClassName("close")[0];

//open modal when click
//btn.onclick = function() {
//    modal.style.display="block";
//}

//close
//close.onclick = function() {
//    modal.style.display="none";
//}

/*
document.getElementsByClassName('button').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'flex';
});
document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'none';
});
*/
