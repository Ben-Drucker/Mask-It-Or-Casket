function clickedYes(option, modal, cost, maxCost, time) {
    let intensity = cost / maxCost;
    theGame.implementPolicy(option, cost, intensity, time);
    document.getElementById(modal).style.display = 'none';
}


function closeOthers(modalNum) {
    if (document.getElementById('endModal').style.display != 'block') { // If game going, close other modals when opening another
        let modals = document.getElementsByClassName("modal");
        for (let i = 0; i < modals.length; i++) {
            modals[i].style.display = "none";
        }
        if (modalNum) {
            document.getElementById(modalNum).style.display = 'block';
        }
    } else { // If game ended, only allow homeModal to display over endModal
        if (modalNum == 'homeModal') {
            if (scoreSubmitted || !theGame.won) {
                window.location.href = '../index.html';
            } else {
                document.getElementById(modalNum).style.display = 'block';
            }
        }
    }
}
