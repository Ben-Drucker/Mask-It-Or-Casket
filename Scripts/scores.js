function computeScore(population, secondsRemaining, fundsRemaining, numDead, numInfected, numVaxed) {
    let maxPnts = 1000000;
    let sharpness = 0.03;
    sharpness += numDead*sharpness/(population*0.1);
    sharpness += numInfected*sharpness/(population*0.25);
    sharpness -= numVaxed*sharpness/(population*1);
    console.log("sharpness:", sharpness); 
    
    return Math.floor((0.5 + 0.5*(fundsRemaining/2000))*maxPnts*(Math.E**(sharpness*(secondsRemaining-theGame.secs))));
