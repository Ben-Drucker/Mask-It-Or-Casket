class City {

    constructor(population) {
        this.transmitted = 0;
        this.population = population;
        this.constituents = [];
        this.groups = new Map();
        this.totalInfected = 0;
        this.connectionDensity = 0.3;
        // this.maxConnections = this.population / 5;
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
        let iter = 0;
        do {
            iter ++;
            if(iter > 200){
                done = true;
            }
            groupSize = Math.floor(this.maxGroupSize * Math.random());
            for (j = i; j < groupSize + i; j++) {
                let internalGroupConnections = Math.floor(0.75 * this.maxConnectionsInGroup * Math.random());
                let externalGroupConnections = Math.floor(0.25 * this.maxConnectionsInGroup * Math.random());
                if (i + this.maxConnectionsInGroup > this.population) {
                    this.maxConnectionsInGroup = this.population - i - 1;
                    done = true;
                    break
                }
                for (let k = 0; k < internalGroupConnections; k++) {
                    let p1 = Math.floor(Math.random() * groupSize) + i;
                    let p2 = Math.floor(Math.random() * groupSize) + i;
                    this.groups.get(this.constituents[p1]).add(this.constituents[p2]);
                    this.groups.get(this.constituents[p2]).add(this.constituents[p1]);
                    this.connections++;
                }
                for (let l = 0; l < externalGroupConnections; l++) {
                    let p1 = Math.floor(Math.random() * groupSize) + i;
                    let p2 = Math.floor(Math.random() * this.population);
                    this.groups.get(this.constituents[p1]).add(this.constituents[p2]);
                    this.groups.get(this.constituents[p2]).add(this.constituents[p1]);
                    this.connections++;
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
                            console.log(person1.id, "gave it to ", person2.id);
                            person2.isInfected = true;
                            itTotalInfected++;
                            tr++;
                        }
                    }
                    if (person2.isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk && !person1.isInfected) {
                            console.log(person2.id, "gave it to ", person1.id);
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
    }

    iterate() {
        for (let i = 0; i < 10; i++) {
            this.iteration();
        }
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
    let testCity = new City(100);
    testCity.generateGroups();
    testCity.injectIllness(10);
    testCity.iterate();
    console.log(testCity.groups, "Connections = ", testCity.connections);
    for (let i = 0; i < testCity.population; i++) {
        console.log(testCity.constituents[i], testCity.constituents[i].isInfected);
    }
    console.log(testCity.transmitted, "/", testCity.population);
}

main()