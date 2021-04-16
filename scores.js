function computeScore(population, secondsRemaining, fundsRemaining, numDead, numInfected, numVaxed) {
    let secondExponent = 1;
    let fundsExponent = 1;
    let numVaxedExponent = 0.8;
    let deadExponent = -2;
    let infectedExponent = -1.5;
    let populationExponent = -1 * (deadExponent + infectedExponent);
    let scaleFactor = 1 / 20000000;        //PARAMETER
    let magnitudeFactor = 1000;
    secondsRemaining **= secondExponent;
    fundsRemaining **= fundsExponent;
    numDead **= deadExponent;
    numInfected **= infectedExponent;
    population **= populationExponent;
    return magnitudeFactor * Math.floor(scaleFactor * (secondsRemaining + fundsRemaining) * population * numDead * numInfected);
}

/* For testing purposes only

for (let i = 0; i <= 600; i += 50) {
    for (let j = 100; j > 0; j-=5) {
        console.log("Dead", i, "Infected", 100 * i, "Time Left", j, "SCORE:", computeScore(75000, j, 1000, i, 100 * i));
    }
}

*/