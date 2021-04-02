var funds = 3000;
function expense(cost) {
    if (funds>cost) {
        funds = funds - cost;
    } else {
        //print and log error
    }
}