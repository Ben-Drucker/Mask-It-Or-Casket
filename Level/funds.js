var funds = 3000;
function expense(cost) {
    if (funds >= cost) {
        funds = funds - cost;
        document.getElementById("funds").innerHTML = "Funds:" + funds;
        return true;
    } else {
        console.log("You ran out of money 💸");
        return false;
    }
}