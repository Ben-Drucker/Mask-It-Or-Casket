// get modal
var modal = document.getElementById("myModal");

// get button to open
var btn = document.getElementById("myBtn");

//get close button
var close = document.getElementsByClassName("close")[0];

//open modal when click
btn.onclick = function() {
    modal.style.display="block";
}

//close
close.onclick = function() {
    modal.style.display="none";
}

/*
document.getElementsByClassName('button').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'none';
});
*/