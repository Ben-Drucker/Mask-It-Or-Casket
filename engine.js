class City {

    constructor(population) {
        this.transmitted = 0;
        this.population = population;
        this.constituents = [];
        this.groups = new Map();
        this.totalInfected = 0;
        this.connectionDensity = 0.3;
        // this.maxConnections = this.population / 5;
        this.maxConnections = 20;
        this.connections = 0;
        for (let i = 0; i < this.population; i++) {
            let gregarious = Math.floor(Math.random() * this.maxConnections);
            let risk = Math.random();
            this.constituents.push(new Person(i, gregarious, risk));
        }
    }

    generateGroups() {
        let randResult;
        for (let i = 0; i < this.population; i++) {   //initialize groups dictionary
            this.groups.set(this.constituents[i], new Set());
        }
        for (let i = 0; i < this.population; i++) {
            let howManyInRow = Math.floor(Math.random() * this.maxConnections/2);
            for (let k = 0; k < howManyInRow; k++) {
                let j = Math.floor(Math.random() * (this.population - i)) + i;
                this.groups.get(this.constituents[j]).add(this.constituents[i]);
                this.groups.get(this.constituents[i]).add(this.constituents[j]);
                this.connections++;
            }
        }
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
        let transmissionRisk = 0.2;//TODO: SUBJECT TO CHANGE. IMPORTANT PARAMETER.
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
                            tr ++;
                        }
                    }
                    if (person2.isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk && !person1.isInfected) {
                            console.log(person2.id, "gave it to ", person1.id);
                            person1.isInfected = true;
                            itTotalInfected++;
                            tr ++;
                        }
                    }
                })
            })
        })
        this.totalInfected = itTotalInfected;
        this.transmitted = tr;
    }

    iterate() {
        for (let i = 0; i < 1; i++) {
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
    let testCity = new City(1000);
    testCity.generateGroups();
    testCity.injectIllness(1);
    testCity.iterate();
    console.log(testCity.groups, "Connections = ", testCity.connections);
    console.log(testCity.transmitted);
}

main()