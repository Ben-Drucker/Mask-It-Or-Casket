//import { City } from "./engine";

class Game {

    constructor(population, numberInjected) {
        this.previousPercentage = 0;
        this.funds = 3000;
        this.secondsLeft;   //TODO

        /* Set up City */
        this.city = new City(population);
        this.city.generateGroups();
        this.city.injectIllness(numberInjected);
    }

    /**
     * Takes the cost of a policy implementation and checks if there are funds available
     * Returns 'true' if there are enough funds.
     * Returns 'false' if there are not enough funds.
     */
    expense(cost) {
        if (this.funds >= cost) {
            this.funds = this.funds - cost;
            document.getElementById("funds").innerHTML = "Funds:" + this.funds;
            return true;
        } else {
            console.log("You ran out of money");
            return false;
        }
    }

    /**
     * Takes in an option string ("Vax", "Distance", "Lockdown", or "Masks")
     */
    implementPolicy(option) {

        if (option == "Vax") {
            if (this.city.vaxInProgress){
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(1600) == false){
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Vaccination");
            this.city.vaxInProgress = true;
            this.city.vaxStartIteration = this.city.currentIteration;
        }
        else if (option == "Distance") {
            if (this.city.DistanceInProgress){
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(200) == false){
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Distance");
            this.city.distancingInProgress = true;
            this.city.distancingStartIteration = this.city.currentIteration
        }
        else if (option == "Lockdown") {
            if (this.city.lockDownInProgress){
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(800) == false){
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Lockdown");
            this.city.lockDownInProgress = true;
            this.city.lockDownStartIteration = this.city.currentIteration;
        }
        else if (option == "Masks") {
            if (this.city.masksInProgress){
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(400) == false){
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Masks");
            this.city.masksInProgress = true;
            this.city.maskStartIteration = this.city.currentIteration;
        }
        else {
            throw "Error! Invalid implementPolicy option! Quitting implementPolicy.";
        }
    }

    timedIteration(city, numberOfIterationsDesired, iterationTimer) {
        drawCityPop();
        changeStatus();
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
