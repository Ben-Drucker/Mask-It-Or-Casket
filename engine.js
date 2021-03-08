class City {

    constructor(population) {
        this.population = population;
        this.constituents = [];
        this.groups = new Map();
        this.totalInfected = 0;
        let max = 10
        for (let i = 0; i < this.population; i++) {
            let maxInteractions;
            if (this.population < max) {
                maxInteractions = this.population;
            }
            else {
                maxInteractions = max;
            }
            let gregarious = Math.floor(Math.random() * maxInteractions);
            let risk = Math.random();
            this.constituents.push(new Person(i, gregarious, risk));
        }
    }

    generateGroups() {
        let genGroups = this.groups;
        let genConstituents = this.constituents;
        let genPopulation = this.population;
        genConstituents.forEach(function (person) {
            genGroups.set(person, new Set());
            while (genGroups.get(person).size < person.gregarious) {
                let randPerson = genConstituents[Math.floor(genPopulation * Math.random())];
                if (!genGroups.get(person).has(randPerson)) {
                    genGroups.get(person).add(randPerson);
                }
            }
        })
    }

    injectIllness(numberInjected) {
        for (let i = 0; i < numberInjected; i++) {
            let injectee = this.constituents[Math.floor(this.population * Math.random())];
            injectee.isInfected = true;
        }
    }

    iteration() {
        var t = this.constituents;
        var transmissionRisk = 0.15 //TODO: SUBJECT TO CHANGE
        let itGroups = this.groups;
        let itTotalInfected = this.totalInfected;
        itGroups.forEach(function (group) {  //for each group... 
            group.forEach(function (person1) {//for each person 1 in each group...
                group.forEach(function (person2) {//for each person 2 in each group...
                    if (person1.isInfected) {
                        var chance = Math.random();
                        if (chance < transmissionRisk*person2.risk) {
                            person2.isInfected = true;
                            itTotalInfected++;
                        }
                    }
                    if (person2.isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk*person1.risk) {
                            person1.isInfected = true;
                            itTotalInfected++;
                        }
                    }
                })
            })
        })
    }

    iterate() {
        for (let i = 0; i < 1; i++) {
            this.iteration();
        }
    }

    clearPrint() { 
        for (let i = 0; i < this.population; i++) {
            console.log(this.constituents[i]);
        }
        console.log(this.totalInfected);
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
    }

}

function main() {
    let testCity = new City(100);
    testCity.generateGroups();
    testCity.injectIllness(1);
    testCity.iterate();
    testCity.clearPrint();
}

main()