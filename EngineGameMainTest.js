import { City } from "./engine.js";

let lastPctg = 0;

function main() {
    let testCity = new City(50000);
    testCity.generateGroups();
    testCity.injectIllness(100);
    iterateByTime(testCity);
}

function timedIteration(city, numberOfIterationsDesired, iterationTimer) {
    city.iteration();
    //console.log("Iteration", city.currentIteration, ".", city.numOfTransmissions, "were infected /", city.countEligible(), " could have been infected/", "out of", city.population, "(", city.percentageInfected,"% infected ) %Δ = ",city.percentageInfected - lastPctg);
    lastPctg = city.percentageInfected;
    if (city.currentIteration >= numberOfIterationsDesired) {
        clearInterval(iterationTimer)
    }
}

function iterateByTime(city) {
    let numberOfMins = 5;
    let intervalSeconds = 1;
    let numberOfIterationsDesired = 60*numberOfMins/intervalSeconds;
    timedIteration(city, numberOfIterationsDesired, null);
    let timedIntervals = setInterval(function(){
        timedIteration(city, numberOfIterationsDesired, timedIntervals);
    }, intervalSeconds * 1000);
}

main();