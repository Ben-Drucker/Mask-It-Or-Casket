function computeScore(population, secondsRemaining, fundsRemaining, numDead, numInfected, numVaxed) {
    let maxPnts = 1000000;
    let sharpness = 0.02;
    sharpness += numDead*sharpness/(population*0.3);
    sharpness += numInfected*sharpness/(population*0.6);
    sharpness -= numVaxed*theGame.city.fractionVaxingEfficacy*sharpness/(population*0.1);
    console.log("sharpness:", sharpness); 
    sharpness = Math.max(0.04, sharpness);
    
    return Math.floor((0.5 + 0.5*(fundsRemaining/2000))*maxPnts*(Math.E**(sharpness*(secondsRemaining-theGame.secs))));

}
