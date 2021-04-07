function computeScore(population, secondsRemaining, fundsRemaining, numDead, numInfected) {
    let secondExponent = 1.5;
    let fundsExponent = 1;
    let deadExponent = -2;
    let infectedExponent = -1.5;
    let populationExponent = -1 * (deadExponent + infectedExponent);
    let scaleFactor = 1 / 2000000;        //PARAMETER
    secondsRemaining **= secondExponent;
    fundsRemaining **= fundsExponent;
    numDead **= deadExponent;
    numInfected **= infectedExponent;
    population **= populationExponent;
    return Math.floor(scaleFactor * (secondsRemaining + fundsRemaining) * population * numDead * numInfected);
}

for (let i = 0; i <= 600; i += 50) {
    for (let j = 100; j > 0; j-=5) {
        console.log("Dead", i, "Infected", 100 * i, "Time Left", j, "SCORE:", computeScore(75000, j, 1000, i, 100 * i));
    }
}