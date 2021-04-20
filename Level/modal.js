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

function clickedYes(option, modal, cost, maxCost) {
  let intensity = cost/maxCost;
  theGame.implementPolicy(option, cost, intensity);
  document.getElementById(modal).style.display='none';
  if (option == "Vax" && theGame.city.vaxInProgress){
    document.getElementById("buttonVaccine").style.background="orange";
  }
  else if (option == "Distance" && theGame.city.distancingInProgress){
    document.getElementById("buttonDistance").style.background="orange";
  }
  else if (option == "Lockdown" && theGame.city.lockDownInProgress){
    document.getElementById("buttonLockdown").style.background="orange";
  }
  else if (option == "Masks" && theGame.city.masksInProgress){
    document.getElementById("buttonMask").style.background="orange";
  }
}

function clickedYesTest(option, modal, cost, maxCost) {
  let intensity = cost/maxCost;
  theGame.implementPolicy(option, cost, intensity);
  document.getElementById(modal).style.display='none';
  if (option == "Vax" && theGame.city.vaxInProgress){
    document.getElementById("buttonVaccine").className="loader"
  }
  else if (option == "Distance" && theGame.city.distancingInProgress){
    document.getElementById("buttonDistance").style.background="orange";
  }
  else if (option == "Lockdown" && theGame.city.lockDownInProgress){
    document.getElementById("buttonLockdown").style.background="orange";
  }
  else if (option == "Masks" && theGame.city.masksInProgress){
    document.getElementById("buttonMask").style.background="orange";
  }
}

function closeOthers(modalNum){
  if (modalNum != 'modal1') {
    document.getElementById('modal1').style.display='none';
  }
  if (modalNum != 'modal2') {
    document.getElementById('modal2').style.display='none';
  }
  if (modalNum != 'modal3'){
    document.getElementById('modal3').style.display='none';
  }
  if (modalNum != 'modal4'){
    document.getElementById('modal4').style.display='none';
  }
  if (modalNum != 'modal5'){
    document.getElementById('modal5').style.display='none';
  }
  document.getElementById(modalNum).style.display='block';
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
