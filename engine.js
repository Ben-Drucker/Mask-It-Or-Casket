class City {

    constructor(population) {
        this.distancingInProgress = false;
        this.masksInProgress = false;
        this.lockDownInProgress = false;
        this.population = population;
        this.personsInfected = [];
        this.personsDead = [];
        this.sicknessLog = [];
        this.currentIteration = 0;
        this.numOfTransmissions = 0;
        this.percentageInfected = 0;
        this.citizens = [];
        this.groups = new Map();
        this.numInfected = 0;
        this.numDead = 0;
        this.numOfConnections = 0;
        for (let i = 0; i < this.population; i++) {
            let ageIndex = Math.floor(Math.random() * (this.population + 1));
            let age = ageDistributions.ages[ageIndex];
            let risk = Math.random();
            this.citizens.push(new Person(i, age, risk));
        }
        /*Parameters Below*/
        this.fractionMaskEfficacy = 0.5;        //PARAMETER
        this.fractionUsingMasks = 0.5;          //PARAMETER
        this.fractionDistancing = 0.2;          //PARAMETER
        this.fractionDistancingEfficacy = 0.2;  //PARAMETER


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
                this.personsInfected.push(injectee);
                this.numOfTransmissions++;
                this.sicknessLog.push(injectee.id.toString() + " injected.");
            }
        }
    }

    iteration() {
        this.personsInfected.forEach((function (person1) {  //for each infected person1 
            this.groups.get(person1).forEach((function (person2) {//for each person2 they are linked to
                let interactionChance = person2[1];
                person2 = person2[0];
                if (!person2.isInfected) {
                    let chance = Math.random();
                    let interactionTransmissionRisk = this.transmissionRisk * interactionChance;

                    if (this.distancingInProgress) {
                        if (person2.risk < this.fractionDistancing) {
                            interactionTransmissionRisk *= (1 - this.fractionDistancingEfficacy);
                        }
                        if (person1.risk < this.fractionDistancing) {
                            interactionTransmissionRisk *= (1 - this.fractionDistancingEfficacy);
                        }
                    }

                    if (this.masksInProgress) {
                        if (person2.risk < this.fractionUsingMasks) {
                            interactionTransmissionRisk *= (1 - this.fractionMaskEfficacy);
                        }
                        if (person1.risk < this.fractionUsingMasks) {
                            interactionTransmissionRisk *= (1 - this.fractionMaskEfficacy);
                        }
                    }

                    if (chance < interactionTransmissionRisk) {
                        this.sicknessLog.push(person1.id + " gave it to " + person2.id + " in iteration " + this.currentIteration);
                        person2.isInfected = true;
                        this.personsInfected.push(person2);
                        this.numInfected++;
                        this.numOfTransmissions++;
                    }
                }
            }).bind(this))
        }).bind(this))
        this.currentIteration++;
        this.percentageInfected = 100 * (this.numOfTransmissions / this.population);
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
            console.log(this.getConnections(i));
        }
    }

    countEligible() {
        let count = 0;
        this.groups.forEach(function (group) {
            if (group.size != 0) {
                count++;
            }
        })
        return count;
    }

    interactionChanceFunction(x, groupSize) { /*Previously 0.9*Math.E ** (-3 * k);*/
        let a = 0.5; //PARAMETER Determining the falloff of interactionChances
        let b = groupSize / 3;    //PARAMETER Determining the inflection point of interactions
        let c = 0.5;  //PARAMETER Determining the inflection point multipier
        return c * (1 / (1 + Math.E ** (a * (x - b))));  //Logisitc decay equation: https://en.wikipedia.org/wiki/Logistic_function
    }

    death() {
        this.personsInfected.forEach((function (infectedPerson) {
            if (infectedPerson.willDie == null) {
                infectedPerson.infectedDuringIteration = this.currentIteration;
                let personDeathProb = deathProbability(infectedPerson.age);
                let chance = Math.random();
                if (chance < personDeathProb) {
                    let daysTillDead = Math.floor(Math.random() * 9) + 5;
                    infectedPerson.iterationDeathDay = this.currentIteration + daysTillDead;
                    infectedPerson.willDie = true;
                }
                else {
                    infectedPerson.willDie = false;
                }
            }
            else if (infectedPerson.willDie) {
                if (this.currentIteration == infectedPerson.iterationDeathDay) {
                    this.personsDead.push(infectedPerson);
                    infectedPerson.isDead = true;
                    this.numDead++;
                    //console.log("Death:", infectedPerson);
                }
            }
            else {
                ;
            }
        }).bind(this));


        function deathProbability(age) {
            let a = 0.04;
            let b = 0.07;
            return (b * (Math.E ** (a * age) - 1)) / 25;
        }
    }


}
class Person {
    constructor(id, age, risk) {
        this.id = id;
        this.age = age;
        this.isInfected = false;
        this.isDead = false;
        this.risk = risk;
        this.iterationDeathDay = null;
        this.willDie = null;
        this.isVaxed = false;
    }

}

//export { City, Person };