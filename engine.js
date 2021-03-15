class City {

    constructor(population) {
        this.log = []
        this.iterNum = 0;
        this.transmitted = 0;
        this.population = population;
        this.constituents = [];
        this.groups = new Map();
        this.totalInfected = 0;
        this.connectionDensity = 0.3;
        this.out_inRatio = 0.2;
        this.maxGroupSize = 25;
        this.maxConnectionsInGroup = 50;
        this.connections = 0;
        for (let i = 0; i < this.population; i++) {
            let gregarious = Math.floor(Math.random() * this.maxConnections);
            let risk = Math.random();
            this.constituents.push(new Person(i, gregarious, risk));
        }
    }

    generateGroups() {
        for (let i = 0; i < this.population; i++) {   //initialize groups dictionary
            this.groups.set(this.constituents[i], new Set());
        }
        let j = 0;
        let i = 0;
        let groupSize;
        let done = false;
        do {
            groupSize = Math.floor(this.maxGroupSize * Math.random());
            for (j = i; j < groupSize + i; j++) {
                if (done) {
                    break
                }
                let internalGroupConnections = Math.floor((1 - this.out_inRatio) * this.maxConnectionsInGroup * Math.random());
                let externalGroupConnections = Math.floor(this.out_inRatio * this.maxConnectionsInGroup * Math.random());
                if (i + groupSize > this.population) {
                    done = true;
                }
                for (let k = 0; k < internalGroupConnections; k++) {
                    let p1 = Math.floor(Math.random() * groupSize) + i;
                    let p2 = Math.floor(Math.random() * groupSize) + i;
                    if (p1 > this.population - 1) {
                        p1 = Math.floor(Math.random() * this.population);
                    }
                    if (p2 > this.population - 1) {
                        p2 = Math.floor(Math.random() * this.population);
                    }
                    if (p1 < this.population && p2 < this.population) {
                        this.groups.get(this.constituents[p1]).add(this.constituents[p2]);
                        this.groups.get(this.constituents[p2]).add(this.constituents[p1]);
                        this.connections;
                    }
                }
                for (let l = 0; l < externalGroupConnections; l++) {
                    let p1 = Math.floor(Math.random() * groupSize) + i;
                    let p2 = Math.floor(Math.random() * this.population);
                    if (p1 > this.population - 1) {
                        p1 = Math.floor(Math.random() * this.population);
                    }
                    if (p2 > this.population - 1) {
                        p2 = Math.floor(Math.random() * this.population);
                    }
                    if (p1 < this.population && p2 < this.population) {
                        this.groups.get(this.constituents[p1]).add(this.constituents[p2]);
                        this.groups.get(this.constituents[p2]).add(this.constituents[p1]);
                        this.connections++;
                    }
                }
                i += groupSize;
                groupSize = Math.floor(this.maxGroupSize * Math.random());
            }
        } while (i < this.population && !done);
    }

    injectIllness(numberInjected) {
        for (let i = 0; i < numberInjected; i++) {
            let injectee = this.constituents[Math.floor(this.population * Math.random())];
            injectee.isInfected = true;
        }
    }

    iteration() {
        let log = this.log;
        let iter = this.iterNum;
        let tr = 0;
        let t = this.constituents;
        let transmissionRisk = 0.7;//TODO: SUBJECT TO CHANGE. IMPORTANT PARAMETER.
        let itGroups = this.groups;
        let itTotalInfected = this.totalInfected;
        itGroups.forEach(function (group) {  //for each group... 
            group.forEach(function (person1) {//for each person 1 in each group...
                group.forEach(function (person2) {//for each person 2 in each group...
                    let chance;
                    if (person1.isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk && !person2.isInfected) {
                            log.push(person1.id + " gave it to " + person2.id + " in iteration " + iter);
                            person2.isInfected = true;
                            itTotalInfected++;
                            tr++;
                        }
                    }
                    if (person2.isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk && !person1.isInfected) {
                            log.push(person2.id + " gave it to " + person1.id + " in iteration " + iter);
                            person1.isInfected = true;
                            itTotalInfected++;
                            tr++;
                        }
                    }
                })
            })
        })
        this.totalInfected = itTotalInfected;
        this.transmitted += tr;
        this.iterNum++;
    }

    iterate(i) {
        for (let j = 0; j < i; j++) {
            this.iteration();
        }
    }

    getConnections(i) {
        let res = i + ": ";
        let vert = this.groups.get(this.constituents[i]);
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
        this.isSusceptible = true;
        this.gregarious = gregarious;
        this.risk = risk;
        this.isDead = false;
        this.isVaxed = false;
        this.addedToGroups = 0;
    }

}

function main() {
    let testCity = new City(1000);
    testCity.generateGroups();
    testCity.injectIllness(5);
    testCity.iterate(5);
    console.log("Connections = ", testCity.connections);
    console.log(testCity.transmitted, "/", testCity.countEligible(),"/", testCity.population);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
    testCity.printGroups();
    console.log(testCity.log);

}

main()