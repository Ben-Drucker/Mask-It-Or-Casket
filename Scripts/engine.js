class City {

    constructor(population) {
        //Policy Progress
        this.distancingInProgress = false;
        this.masksInProgress = false;
        this.lockDownInProgress = false;
        this.vaxInProgress = false;

        //SIR
        this.immunityRate = 0.5; //PARAMETER
        this.population = population;
        this.personsInfected = new Set();
        this.personsDead = [];
        this.sicknessLog = [];
        this.currentIteration = 0;
        this.numOfTransmissions = 0;
        this.percentageInfected = 0;
        this.citizens = [];
        this.groups = new Map();
        this.numInfected = 0;
        this.numDead = 0;
        this.numRecovered = 0;
        this.numVaxed = 0;
        this.numOfConnections = 0;
        for (let i = 0; i < this.population; i++) {
            let ageIndex = Math.floor(Math.random() * (this.population + 1));
            let age = ageDistributions.ages[ageIndex];
            let risk = Math.random();
            this.citizens.push(new Person(i, age, risk));
        }

        /*PARAMETERS & Policies*/
        //MASKING
        this.masksFullyImplemented = false;
        this.maxFractionMasking = 0.8;
        this.targetFractionMasking = 0;          //User Selected — Efficacy
        this.previousFractionMasking = 0;
        this.fractionMaskEfficacy = 0.65;        //PARAMETER
        this.fractionMasking = 0;             //Implemented Value — Changing Value
        this.initialMaskDelay = 20;             //User Selected — Time
        this.maskImplementationDelay = 35;      //PARAMETER
        this.maskStartIteration = null;
        this.masksStable = null;
        this.stabMsgDisp = false;
        this.notOnFirst = null;

        //DISTANCING
        this.maxFractionDistancing = 0.8;       //PARAMETER
        this.fractionDistancing = 0;            //Implemented Value — Changing Value
        this.targetFractionDistancing = 0;      //User Selected — Efficacy
        this.distancingImplementationDelay = 20;//User Selected — Time
        this.fractionDistancingEfficacy = 0.5;  //PARAMETER
        this.initialDistancingDelay = 20;       //PARAMETER
        this.distancingStartIteration = null;
        this.distanceStopIteration = null;
        this.maxDistanceIntsinsityAchieved = null;

        //VAX
        this.maxFractionVaxEfficacy = 0.95;
        this.fractionVaxing = 0.8;                //PARAMETER
        this.fractionVaxingEfficacy = 0.9;      //PARAMETER
        this.initialVaxDelay = 100;             //PARAMETER
        this.vaxImplementationDelay = 50;       //PARAMETER
        this.vaxStartIteration = null;

        //LOCKDOWN
        this.fractionMaxLockDownEfficacy = 0.75;    //PARAMETER
        this.fractionLockDownEfficacy = 0;          //Implemented Value — Changing Value
        this.targetFractionLockDownEfficacy = 0;    //User Selected — Efficacy
        this.initialLockDownDelay = 10;             //PARAMETER
        this.lockDownImplementationDelay = 25;      //User Selected — time
        this.lockDownStartIteration = null;
        this.lockDownStopIteration = null;
        this.maxLockdownIntensityAchieved = null;

        //DISTRIBUTE
        this.transmissionRisk = 0.2;        //PARAMETER
        this.bipartiteRatio = 0.18;         //PARAMETER Determining the ratio of in-group, out-group graph connections
        this.maxGroupSize = 25;             //PARAMETER
        this.densityFactor = 2;             //PARAMETER
        this.maxConnectionsInGroup = 50;    //PARAMETER
    }

    generateGroups() {
        var pairs = new Map();
        for (let i = 0; i < this.population; i++) {   //initialize groups dictionary
            this.groups.set(this.citizens[i], new Set());
            pairs.set(this.citizens[i], new Set());
            pairs.get(this.citizens[i]).add(this.citizens[i]);
        }
        let intermediate_int = 0;
        let group_ind = 0;
        let groupSize;
        let done = false;
        do {
            groupSize = Math.floor(this.maxGroupSize * Math.random());
            for (intermediate_int = group_ind; intermediate_int < groupSize + group_ind; intermediate_int++) {
                if (done) {
                    break
                }
                let internalGroupConnections = this.densityFactor * Math.floor((1 - this.bipartiteRatio) * this.maxConnectionsInGroup * Math.random());
                let externalGroupConnections = this.densityFactor * Math.floor(this.bipartiteRatio * this.maxConnectionsInGroup * Math.random());
                if (group_ind + groupSize > this.population) {
                    done = true;
                }
                for (let k = 0; k < internalGroupConnections; k++) {
                    let interactionChance = this.interactionChanceFunction(k, groupSize);
                    let person1 = Math.floor(Math.random() * groupSize) + group_ind;
                    let person2 = Math.floor(Math.random() * groupSize) + group_ind;
                    if (person1 > this.population - 1) {
                        person1 = Math.floor(Math.random() * this.population);
                    }
                    if (person2 > this.population - 1) {
                        person2 = Math.floor(Math.random() * this.population);
                    }
                    if (person1 < this.population && person2 < this.population && person1 != person2) {
                        if (!pairs.get(this.citizens[person1]).has(this.citizens[person2])) {
                            this.groups.get(this.citizens[person1]).add([this.citizens[person2], interactionChance]);
                            this.groups.get(this.citizens[person2]).add([this.citizens[person1], interactionChance]);
                            pairs.get(this.citizens[person1]).add(this.citizens[person2]);
                            pairs.get(this.citizens[person2]).add(this.citizens[person1]);
                        }
                        this.numOfConnections++;
                    }
                }
                for (let l = 0; l < externalGroupConnections; l++) {
                    let interactionChance = this.interactionChanceFunction(l, groupSize);
                    let person1 = Math.floor(Math.random() * groupSize) + group_ind;
                    let person2 = Math.floor(Math.random() * this.population);
                    if (person1 > this.population - 1) {
                        person1 = Math.floor(Math.random() * this.population);
                    }
                    if (person2 > this.population - 1) {
                        person2 = Math.floor(Math.random() * this.population);
                    }
                    if (person1 < this.population && person2 < this.population && person1 != person2) {
                        if (!pairs.get(this.citizens[person1]).has(this.citizens[person2])) {
                            this.groups.get(this.citizens[person1]).add([this.citizens[person2], interactionChance]);
                            this.groups.get(this.citizens[person2]).add([this.citizens[person1], interactionChance]);
                            pairs.get(this.citizens[person1]).add(this.citizens[person2]);
                            pairs.get(this.citizens[person2]).add(this.citizens[person1]);
                        }
                        this.numOfConnections++;
                    }
                }
                group_ind += groupSize;
                groupSize = Math.floor(this.maxGroupSize * Math.random());
            }
        } while (group_ind < this.population && !done);
    }

    injectIllness(numberInjected) {
        for (let i = 0; i < numberInjected; i++) {
            let injectee = this.citizens[Math.floor(this.population * Math.random())];
            if (injectee.isInfected) {
                numberInjected++;
            }
            else {
                injectee.isInfected = true;
                this.personsInfected.add(injectee);
                this.numOfTransmissions++;
                this.sicknessLog.push(injectee.id.toString() + " injected.");
            }
        }
    }

    iteration() {
        let lockDownSubtract = true;
        let distanceSubtract = true;
        let distanceIntensity;
        let maskIntensity;
        let lockDownIntensity;
        this.personsInfected.forEach((person1) => {  //for each infected person1
            this.groups.get(person1).forEach((person2) => {//for each person2 they are linked to
                let interactionChance = person2[1];
                person2 = person2[0];
                if (!person2.isInfected) {
                    let chance = Math.random();
                    let interactionTransmissionRisk = this.transmissionRisk * interactionChance;

                    if (this.distancingInProgress) {
                        let progress = this.currentIteration - this.distancingStartIteration - this.initialDistancingDelay
                        if (progress >= 0 && this.currentIteration < this.distanceStopIteration) {  //if we are past the initial delay
                            this.fractionDistancing = Math.min(this.targetFractionDistancing, progress * this.targetFractionDistancing / this.distancingImplementationDelay);
                            if (person2.risk < this.fractionDistancing) {
                                interactionTransmissionRisk *= (1 - this.fractionDistancingEfficacy);
                            }
                            if (person1.risk < this.fractionDistancing) {
                                interactionTransmissionRisk *= (1 - this.fractionDistancingEfficacy);
                            }
                            document.getElementById("buttonDistance").style.borderColor = "green";
                            distanceIntensity = this.fractionDistancing;
                        }
                        else if (progress >= 0 && this.distanceStopIteration <= this.currentIteration && this.currentIteration < this.distanceStopIteration + this.distancingImplementationDelay) {
                            if (this.maxDistanceIntsinsityAchieved == null) {
                                this.maxDistanceIntsinsityAchieved = this.fractionDistancing;
                            }
                            if (distanceSubtract) {
                                this.fractionDistancing -= (this.maxDistanceIntsinsityAchieved / this.distancingImplementationDelay);
                                distanceSubtract = false;
                            }
                            if (person2.risk < this.fractionDistancing) {
                                interactionTransmissionRisk *= (1 - this.fractionDistancingEfficacy);
                            }
                            if (person1.risk < this.fractionDistancing) {
                                interactionTransmissionRisk *= (1 - this.fractionDistancingEfficacy);
                            }
                            distanceIntensity = this.fractionDistancing;
                            document.getElementById("buttonDistance").style.borderColor = "yellow";
                        }
                        else if (progress >= 0 && this.currentIteration >= this.distanceStopIteration + this.distancingImplementationDelay) {
                            this.distancingInProgress = false;
                            document.getElementById("buttonDistance").style.borderColor = "lightblue";
                            distanceIntensity = null;
                        }
                    }

                    
                    if (this.masksInProgress) {
                        this.masksStable = false;
                        let progress = this.currentIteration - this.maskStartIteration - this.initialMaskDelay;
                        if (progress >= 0 || theGame.numMaskings >=2) {  //if we are past the initial delay
                            if(progress < 0){
                                this.fractionMasking = this.previousFractionMasking;
                            }
                            else{
                                this.fractionMasking = Math.min(this.targetFractionMasking, (progress * (this.targetFractionMasking - this.previousFractionMasking) / this.maskImplementationDelay) + this.previousFractionMasking);
                            }
                            if (person2.risk < this.fractionMasking) {
                                if(Math.random() < 0.005){
                                    //console.log("In here", (progress * (this.targetFractionMasking - this.previousFractionMasking) / this.maskImplementationDelay) );
                                }
                                interactionTransmissionRisk *= (1 - this.fractionMaskEfficacy);
                            }
                            if (person1.risk < this.fractionMasking) {
                                interactionTransmissionRisk *= (1 - this.fractionMaskEfficacy);
                            }
                            document.getElementById("buttonMask").style.borderColor = "green";
                            maskIntensity = this.fractionMasking;
                            if (this.currentIteration >= this.maskStartIteration + this.maskImplementationDelay + this.initialMaskDelay) {
                                this.masksStable = true;
                                if (!this.stabMsgDisp) {
                                    theGame.displayMessage("Mask usage has stabilized!", 5000);
                                    this.stabMsgDisp = true;
                                }
                            }
                            else {
                                this.masksStable = false;
                            }
                        }
                    }

                    if (this.lockDownInProgress) {
                        let progress = this.currentIteration - this.lockDownStartIteration - this.initialLockDownDelay;
                        if (progress >= 0 && this.currentIteration < this.lockDownStopIteration) {  //ramp up
                            this.fractionLockDownEfficacy = Math.min(this.targetFractionLockDownEfficacy, progress * this.targetFractionLockDownEfficacy / this.lockDownImplementationDelay);
                            interactionTransmissionRisk *= (1 - this.fractionLockDownEfficacy);
                            lockDownIntensity = this.fractionLockDownEfficacy;
                            document.getElementById("buttonLockdown").style.borderColor = "green";
                        }
                        else if (progress >= 0 && this.lockDownStopIteration <= this.currentIteration && this.currentIteration < this.lockDownStopIteration + this.lockDownImplementationDelay) {//ramp down
                            if (this.maxLockdownIntensityAchieved == null) {
                                this.maxLockdownIntensityAchieved = this.fractionLockDownEfficacy;
                            }
                            if (lockDownSubtract) {
                                this.fractionLockDownEfficacy -= (this.maxLockdownIntensityAchieved / this.lockDownImplementationDelay);
                                lockDownSubtract = false;
                            }
                            interactionTransmissionRisk *= (1 - this.fractionLockDownEfficacy);
                            lockDownIntensity = this.fractionLockDownEfficacy;
                            document.getElementById("buttonLockdown").style.borderColor = "yellow";
                        }
                        else if (progress >= 0 && this.currentIteration >= this.lockDownStopIteration + this.lockDownImplementationDelay) {//end
                            this.lockDownInProgress = false;
                            document.getElementById("buttonLockdown").style.borderColor = "lightblue";
                            lockDownIntensity = null;
                        }
                    }

                    if (person1.isVaxed) {
                        interactionTransmissionRisk *= (1 - this.fractionVaxingEfficacy);
                    }

                    if (person2.isVaxed) {
                        interactionTransmissionRisk *= (1 - this.fractionVaxingEfficacy);
                    }

                    if (person2.hasImmunity) {
                        interactionTransmissionRisk *= (1 - this.immunityRate);
                    }

                    if (chance < interactionTransmissionRisk) {
                        this.sicknessLog.push(person1.id + " gave it to " + person2.id + " in iteration " + this.currentIteration + " p1 risk " + person1.risk + " p2 risk " + person2.risk);
                        person2.isInfected = true;
                        this.personsInfected.add(person2);
                        this.numInfected++;
                        this.numOfTransmissions++;
                    }
                }
            })
        })
        this.currentIteration++;
        this.percentageInfected = 100 * (this.numInfected / this.population);
        if (distanceIntensity == null) {
            distanceIntensity = "--";
        }
        else {
            distanceIntensity = distanceIntensity.toFixed(2);
        }
        if (maskIntensity == null) {
            maskIntensity = "--";
        }
        else {
            maskIntensity = maskIntensity.toFixed(2);
        }
        if (lockDownIntensity == null) {
            lockDownIntensity = "--";
        }
        else {
            lockDownIntensity = lockDownIntensity.toFixed(2);
        }
        console.log("Distance intensity", distanceIntensity, "Mask Intensity", this.fractionMasking, "LockDown Intensity", lockDownIntensity);
    }

    iterate(i) {
        for (let j = 0; j < i; j++) {
            this.iteration();
        }
    }

    getConnections(i) {
        let res = i + ": ";
        let vert = this.groups.get(this.citizens[i]);
        vert.forEach(function (neighbor) {
            res += neighbor[0].id + ", ";
        });
        return res;
    }

    printGroups() {
        for (let i = 0; i < this.population; i++) {
            //console.log(this.getConnections(i));
        }
    }

    countEligible() {
        let count = 0;
        this.groups.forEach(function (group) {
            if (group.size != 0) {
                count++;
            }
        });
        return count;
    }

    interactionChanceFunction(x, groupSize) { /*Previously 0.9*Math.E ** (-3 * k);*/
        let a = 0.5; //PARAMETER Determining the falloff of interactionChances
        let b = groupSize / 3;    //PARAMETER Determining the inflection point of interactions
        let c = 0.5;  //PARAMETER Determining the inflection point multipier
        return c * (1 / (1 + Math.E ** (a * (x - b))));  //Logisitc decay equation: https://en.wikipedia.org/wiki/Logistic_function
    }

    deathProbability(age) {
        let a = 0.04;
        let b = 0.07;
        return (b * (Math.E ** (a * age) - 1)) / 25;
    }

    death() {
        this.personsInfected.forEach((infectedPerson) => {
            if (infectedPerson.willDie == null) {
                if (infectedPerson.hasRecovered) {
                    infectedPerson.hasRecovered = false;
                }
                infectedPerson.infectedDuringIteration = this.currentIteration;
                let personDeathProb = this.deathProbability(infectedPerson.age);
                let chance = Math.random();
                if (chance < personDeathProb) {
                    let daysTillDead = Math.floor(Math.random() * 9) + 5;
                    infectedPerson.iterationDeathDay = this.currentIteration + daysTillDead;
                    infectedPerson.willDie = true;
                }
                else {
                    infectedPerson.willDie = false;
                    let minRecoveryTime = 14; //PARAMETER
                    let maxRecoveryTime = 42;
                    let recoveryTime = minRecoveryTime + Math.floor((maxRecoveryTime - minRecoveryTime) * (1 - chance));
                    infectedPerson.iterationRecoveryDay = this.currentIteration + recoveryTime;
                    infectedPerson.recoveryTime = recoveryTime;
                }
            }
            else if (infectedPerson.willDie) {
                if (this.currentIteration == infectedPerson.iterationDeathDay) {
                    this.personsDead.push(infectedPerson);
                    infectedPerson.isDead = true;
                    this.numDead++;
                    this.numInfected--;
                    this.personsInfected.delete(infectedPerson);
                    //console.log("Death:", infectedPerson);
                }
            }
            else if (infectedPerson.isInfected && !infectedPerson.willDie) {
                if (this.currentIteration == infectedPerson.iterationRecoveryDay) {
                    infectedPerson.isInfected = false;
                    infectedPerson.hasImmunity = true;
                    this.numRecovered++;
                    this.numInfected--;
                    this.personsInfected.delete(infectedPerson);
                    infectedPerson.hasRecovered = true;
                }
            }
        });
    }

    vaccinate() {
        let vaccinesPerDay = Math.floor(this.population / this.vaxImplementationDelay) * this.fractionVaxing;
        let vaccinatedPeople = 0;
        for (let i = 0; i < vaccinesPerDay; i++) {
            let person = this.citizens[Math.floor(Math.random() * this.population)];
            if (!person.isVaxed && !person.isDead && person.risk < this.fractionVaxing) {
                person.isVaxed = true;
                vaccinatedPeople++;
                this.numVaxed++;

            }
        }
        //console.log("Vaccinated", vaccinatedPeople, "with efficacy:", this.fractionVaxingEfficacy);
    }
}

class Person {
    constructor(id, age, risk) {
        this.id = id;
        this.age = age;
        this.isInfected = false;
        this.isDead = false;
        this.risk = risk;
        this.recoveryTime;
        this.iterationDeathDay = null;
        this.iterationRecoveryDay = null;
        this.willDie = null;
        this.isVaxed = false;
        this.hasImmunity = false;
        this.hasRecovered = false;

        this.x = 0;
        this.y = 0;
        this.width = 25;
        this.height = 25;
        this.frameX = 0;
        this.frameY = 0;
    }
}
