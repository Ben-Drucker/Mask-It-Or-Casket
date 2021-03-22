//import { City } from "./engine";

class Game {

    constructor(population, numberInjected) {
        this.currentSubIteration;
        this.previousPercentage = 0;
        this.population = population;
        this.numSusceptible;
        this.numInfected;
        this.numRemoved;
        this.numDead;
        this.funds;
        this.secondsLeft;
        this.city = new City(this.population);
        this.city.generateGroups();
        this.city.injectIllness(numberInjected);
    }

    implementVax() {

    }

    implementDistance() {

    }

    implementLockdown() {

    }

    implementMasks() {

    }

    getCurrentRisk() {

    }

    timedIteration(city, numberOfIterationsDesired, iterationTimer) {
        city.iteration();
        console.log("Iteration", city.currentIteration, ".", city.numOfTransmissions, "were infected out of", city.population, "(", city.percentageInfected.toFixed(2), "% infected ) %delta = ", (city.percentageInfected - this.previousPercentage).toFixed(2));
        this.previousPercentage = city.percentageInfected;
        if (this.currentSubIteration >= numberOfIterationsDesired) {
            clearInterval(iterationTimer)
        }
        this.currentSubIteration ++;
    }

    iterateByTime(city, delay, iterations) {
        this.currentSubIteration = 0;
        let intervalSeconds = delay;
        let numberOfIterationsDesired = iterations;
        this.timedIteration(city, numberOfIterationsDesired, null);
        if (numberOfIterationsDesired > 1) {
            let timedIntervals = setInterval((function () {
                this.timedIteration(city, numberOfIterationsDesired, timedIntervals);
            }).bind(this), intervalSeconds * 1000);
        }
    }

}