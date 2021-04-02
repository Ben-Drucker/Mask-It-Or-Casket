//import { City } from "./engine";

class Game {

    constructor(population, numberInjected) {
        this.previousPercentage = 0;
        this.funds;         //TODO
        this.secondsLeft;   //TODO

        /* Set up City */
        this.city = new City(population);
        this.city.generateGroups();
        this.city.injectIllness(numberInjected);
    }

    /**
     * Takes in an option string ("Vax", "Distance", "Lockdown", or "Masks")
     */
    implementPolicy(option) {

        if (option == "Vax") {
            console.log("Turned on Vaccination");
            this.city.vaxInProgress = true;
            this.city.vaxStartIteration = this.city.currentIteration;
        }
        else if (option == "Distance") {
            console.log("Turned on Distance");
            this.city.distancingInProgress = true;
            this.city.distancingStartIteration = this.city.currentIteration;
        }
        else if (option == "Lockdown") {
            console.log("Turned on Lockdown. Not yet implemented.");
        }
        else if (option == "Masks") {
            console.log("Turned on Masks");
            this.city.masksInProgress = true;
            this.city.maskStartIteration = this.city.currentIteration;
        }
        else {
            throw "Error! Invalid implementPolicy option! Quitting implementPolicy.";
        }
    }


    timedIteration(city, numberOfIterationsDesired, iterationTimer) {
        city.iteration();
        city.death();
        if (city.vaxInProgress && this.currentSubIteration >= city.initialVaxDelay + city.vaxStartIteration) {
            city.vaccinate();
        }
        console.log("Iteration", city.currentIteration, ".", city.numOfTransmissions, "were infected out of", city.population, "(", city.percentageInfected.toFixed(2), "% infected ) %delta = ", (city.percentageInfected - this.previousPercentage).toFixed(2), "Dead:", city.numDead); this.previousPercentage = city.percentageInfected;

        // if (this.currentSubIteration == 30) {//Purely Test Code
        //     this.implementPolicy("Distance");
        //     this.implementPolicy("Masks");
        //     this.implementPolicy("Vax");
        // }

        if (this.currentSubIteration >= numberOfIterationsDesired) {
            clearInterval(iterationTimer)
        }
        this.currentSubIteration++;
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
