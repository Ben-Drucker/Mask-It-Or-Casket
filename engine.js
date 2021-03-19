class City {

    constructor(population) {
        this.currentRiskLevel; //TODO: Implement risk levels
        this.population = population;
        this.personsInfected = [];
        this.sicknessLog = [];
        this.currentIteration = 0;
        this.numOfTransmissions = 0;
        this.citizens = [];
        this.groups = new Map();
        this.numInfected = 0;
        this.connectionDensity = 0.3;
        this.bipartiteRatio = 0.1; //
        this.maxGroupSize = 25;
        this.maxConnectionsInGroup = 50;
        this.numOfConnections = 0;
        for (let i = 0; i < this.population; i++) {
            let gregarious = Math.floor(Math.random() * this.maxConnections);
            let risk = Math.random();
            this.citizens.push(new Person(i, gregarious, risk));
        }
    }

    generateGroups() {
        for (let i = 0; i < this.population; i++) {   //initialize groups dictionary
            this.groups.set(this.citizens[i], new Set());
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
                let internalGroupConnections = Math.floor((1 - this.bipartiteRatio) * this.maxConnectionsInGroup * Math.random());
                let externalGroupConnections = Math.floor(this.bipartiteRatio * this.maxConnectionsInGroup * Math.random());
                if (group_ind + groupSize > this.population) {
                    done = true;
                }
                for (let k = 0; k < internalGroupConnections; k++) {
                    let interactionChance = Math.E**(-0.5*k);
                    let person1 = Math.floor(Math.random() * groupSize) + group_ind;
                    let person2 = Math.floor(Math.random() * groupSize) + group_ind;
                    if (person1 > this.population - 1) {
                        person1 = Math.floor(Math.random() * this.population);
                    }
                    if (person2 > this.population - 1) {
                        person2 = Math.floor(Math.random() * this.population);
                    }
                    if (person1 < this.population && person2 < this.population) {
                        this.groups.get(this.citizens[person1]).add([this.citizens[person2], interactionChance]);
                        this.groups.get(this.citizens[person2]).add([this.citizens[person1], interactionChance]);
                        this.numOfConnections;
                    }
                }
                for (let l = 0; l < externalGroupConnections; l++) {
                    let interactionChance = Math.E**(-0.5*l);
                    let person1 = Math.floor(Math.random() * groupSize) + group_ind;
                    let person2 = Math.floor(Math.random() * this.population);
                    if (person1 > this.population - 1) {
                        person1 = Math.floor(Math.random() * this.population);
                    }
                    if (person2 > this.population - 1) {
                        person2 = Math.floor(Math.random() * this.population);
                    }
                    if (person1 < this.population && person2 < this.population) {
                        this.groups.get(this.citizens[person1]).add([this.citizens[person2], interactionChance]);
                        this.groups.get(this.citizens[person2]).add([this.citizens[person1], interactionChance]);
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
            injectee.isInfected = true;
        }
    }

    iteration() {
        let transmissionRisk = 0.7;//TODO: SUBJECT TO CHANGE. IMPORTANT PARAMETER.
        this.groups.forEach((function (group) {  //for each group... 
            group.forEach((function (person1) {//for each person 1 in each group...
                group.forEach((function (person2) {//for each person 2 in each group...
                    let chance;
                    if (person1[0].isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk*person2[1] && !person2[0].isInfected) {
                            this.sicknessLog.push(person1[0].id + " gave it to " + person2[0].id + " in iteration " + this.currentIteration);
                            person2[0].isInfected = true;
                            this.personsInfected.push(person2[0]);
                            this.numInfected++;
                            this.numOfTransmissions ++;
                        }
                    }
                    if (person2[0].isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk*person1[1] && !person1[0].isInfected) {
                            this.sicknessLog.push(person2[0].id + " gave it to " + person1[0].id + " in iteration " + this.currentIteration);
                            person1[0].isInfected = true;
                            this.personsInfected.push(person1[0]);
                            this.numInfected++;
                            this.numOfTransmissions ++;
                        }
                    }
                }).bind(this))
            }).bind(this))
        }).bind(this))
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
            res += neighbor.id + ", ";
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
        this.groups.forEach(function (group){
            if(group.size!= 0){
                count ++;
            }
        })
        return count;
    }
}


class Person {
    constructor(id, gregarious, risk) {
        this.id = id;
        this.isInfected = false;
        // this.isSusceptible = true; // Not using these yet
        // this.gregarious = gregarious;
        // this.risk = risk;
        // this.isDead = false;
        // this.isVaxed = false;
        // this.addedToGroups = 0;
    }

}

export {City, Person};