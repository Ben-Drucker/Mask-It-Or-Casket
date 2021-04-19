//import { City } from "./engine";

class Game {

    constructor(population, numberInjected) {
        this.won = false;
        this.hasEnded = false;
        this.previousPercentage = 0;
        this.funds = 1000;
        this.secs = null;
        this.secondsRemaining = null;
        this.interIteratoryTime = null;
        this.fractionMinGameLength = 0.2; //minimum length of game, as a fraction of the total game length
        this.fractionMaxDead = 0.0015; //maximum number of dead people, as a fraction of the total population
        this.maxRiskPoints = 8; //maxRiskPoints occurs when above fractionRiskPenaltyThreashold
        this.maxPercentageInfected = 18;
        this.requiredProPoints = 50; //originally 65
        this.fractionRiskPenaltyThreashold = 0.1;
        this.fundingIterations = 20;
        this.fundingIterationAmount = 150;

        this.numRiskPoints = 0;
        this.numProPoints = 0;

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
            return true;
        } else {
            console.log("Not enough money!");
            return false;
        }
    }

    /**
     * Takes in an option string ("Vax", "Distance", "Lockdown", or "Masks")
     */
    implementPolicy(option, cost, intensity) {
        if (option == "Vax") {
            if (this.city.vaxInProgress) {
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(cost) == false) {
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Vaccination");
            theGame.updateFundsDisplay(cost, false);
            this.city.fractionVaxing = intensity * this.city.maxFractionVaxing;
            this.city.vaxInProgress = true;
            this.city.vaxStartIteration = this.city.currentIteration;
        }
        else if (option == "Distance") {
            if (this.city.DistanceInProgress) {
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(cost) == false) {
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Distance");
            theGame.updateFundsDisplay(cost, false);
            this.city.fractionDistancing = intensity * this.city.maxFractionDistancing;
            this.city.distancingInProgress = true;
            this.city.distancingStartIteration = this.city.currentIteration
        }
        else if (option == "Lockdown") {
            if (this.city.lockDownInProgress) {
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(cost) == false) {
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Lockdown");
            theGame.updateFundsDisplay(cost, false);
            this.city.fractionLockDownEfficacy = intensity * this.city.fractionMaxLockDownEfficacy;
            this.city.lockDownInProgress = true;
            this.city.lockDownStartIteration = this.city.currentIteration;
        }
        else if (option == "Masks") {
            if (this.city.masksInProgress) {
                console.log("Policy has already been implemented");
                return;
            }
            if (this.expense(cost) == false) {
                console.log("Not enough funds to implement policy");
                return;
            }
            console.log("Turned on Masks");
            theGame.updateFundsDisplay(cost, false);
            this.city.fractionMasking = intensity * this.city.maxFractionMasking;
            this.city.masksInProgress = true;
            this.city.maskStartIteration = this.city.currentIteration;
        }
        else {
            throw "Error! Invalid implementPolicy option! Quitting implementPolicy.";
        }
    }

    updateGameStatus(city) {
        let slider = document.getElementById("myRange");
        let sliderMax = slider.max;
        let relPos = slider.value / sliderMax;
        if (city.numDead > this.fractionMaxDead * city.population) {
            console.log("GAME OVER! TOO MANY DEAD!");
            this.hasEnded = true;
            return;
        }
        if (city.percentageInfected > this.maxPercentageInfected) {
            console.log("GAME OVER! TOO MANY INFECTED!");
            this.hasEnded = true;
            return;
        }
        if (this.numRiskPoints > this.maxRiskPoints) {
            console.log("GAME OVER! ACCUMULATED TOO MANY RISK POINTS!");
            this.hasEnded = true;
            return;
        }
        if (this.numProPoints >= this.requiredProPoints) {
            this.hasEnded = true;
            this.won = true;
            return;
        }
        if (relPos > this.fractionRiskPenaltyThreashold) {
            let riskAboveThreashHold = (slider.value - this.fractionRiskPenaltyThreashold * sliderMax);
            let maxAboveThreashHold = (sliderMax - this.fractionRiskPenaltyThreashold * sliderMax)
            let addlRiskPoints = riskAboveThreashHold / maxAboveThreashHold;
            this.numRiskPoints += addlRiskPoints;
        }
        if ((city.currentIteration * this.interIteratoryTime / this.secs) > this.fractionMinGameLength && relPos <= this.fractionRiskPenaltyThreashold) {
            this.numProPoints++;
        }
        console.log("RiskPnts", this.numRiskPoints, "ProPnts", this.numProPoints);
    }

    updateFunds() {
        if (this.currentSubIteration % this.fundingIterations == 2 && this.currentSubIteration != 2) {
            this.updateFundsDisplay(this.fundingIterationAmount, true);
        }
    }

    updateFundsDisplay(amount, willIncrease) {
        if (willIncrease) {
            this.funds += amount;
            document.getElementById("funds").innerHTML = "Money: " + this.funds;
        }
        else {
            this.funds -= amount;
            document.getElementById("funds").innerHTML = "Money: " + this.funds;
        }
    }

    iterationItems(city) {
        drawCityPop();
        //canvas.clearRect(0,0,750.750);
        changeStatus();
        city.iteration();
        city.death();
        this.updateSlider(city);
        this.updateStatistics(city);
        this.updateGameStatus(city);
        this.updateFunds();
    }

    timedIteration(city, numberOfIterationsDesired, iterationTimer) {
        this.iterationItems(city);
        if (city.vaxInProgress && this.currentSubIteration >= city.initialVaxDelay + city.vaxStartIteration) {
            city.vaccinate();
            //TEMP:
            document.getElementById("buttonVaccine").style.background = "green";
        }
        //console.log("Iteration", city.currentIteration, ".", city.numOfTransmissions, "were infected out of", city.population, "(", city.percentageInfected.toFixed(2), "% infected ) %delta = ", (city.percentageInfected - this.previousPercentage).toFixed(2), "Dead:", city.numDead); 
        this.previousPercentage = city.percentageInfected;

        if (this.currentSubIteration >= numberOfIterationsDesired || this.hasEnded) {
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

    updateSlider(city) {
        if (this.currentSubIteration < 1) {
            return;
        }
        let maxRisk = 0.8;
        let resolution = 10000;
        let delta = city.percentageInfected - this.previousPercentage;
        let sampleInfected = 0;
        spritesA.forEach((sprite) => {
            if (sprite.isInfected) {
                sampleInfected++;
                if (sprite.isVaxed) {
                    sampleInfected -= city.fractionVaxingEfficacy;
                }
            }
        })
        let testResults = sampleInfected / spritesA.length;
        let deltaContribution = Math.floor(delta * resolution);
        let testsContribution = Math.floor(testResults * resolution);
        let value = Math.max(deltaContribution, testsContribution);
        value = Math.min(value, maxRisk * resolution);
        let slider = document.getElementById("myRange");
        let fps = 60;
        let mills = 1000;
        let diff = value - slider.value;
        let numKeyFrames = Math.floor(mills * fps / 1000);
        let change = diff / numKeyFrames;
        let iters = 0;
        let animation = setInterval(() => {
            if (iters > numKeyFrames) {
                clearInterval(animation);
            }
            let newValue = parseInt(slider.value) + change;
            slider.value = Math.floor(newValue);
            iters++;
        }, Math.floor(1000 / fps))
        //console.log("SliderVal", slider.value);
    }

    updateStatistics(city) {
        document.getElementById("numInfected").innerHTML = city.numInfected;
        document.getElementById("infectedPct").innerHTML = city.percentageInfected.toFixed(2);
        document.getElementById("population").innerHTML = city.population;
        document.getElementById("numDead").innerHTML = city.numDead
        document.getElementById("deadPct").innerHTML = ((city.numDead / city.population) * 100).toFixed(3);
        document.getElementById("numRecovered").innerHTML = city.numRecovered;
        document.getElementById("GreenPoints").innerHTML = this.numProPoints + " of " + this.requiredProPoints;
        document.getElementById("RedPoints").innerHTML = Math.floor(this.numRiskPoints) + " of " + this.maxRiskPoints;
    }

}
