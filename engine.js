class City {

    constructor(population) {
        this.population = population;
        this.constituents = [];
        this.groups = new Map();
        this.totalInfected = 0;
        let max = 15
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
            while (genGroups.get(person).size < person.gregarious && person.gregarious != 0) {
                let randPerson = genConstituents[Math.floor(genPopulation * Math.random())];
                if (!genGroups.get(person).has(randPerson)) {
                    genGroups.get(person).add(randPerson);
                    randPerson.addedToGroups ++;
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
        let t = this.constituents;
        let transmissionRisk = 0.1*.65;//TODO: SUBJECT TO CHANGE. IMPORTANT PARAMETER.
        let itGroups = this.groups;
        let itTotalInfected = this.totalInfected;
        itGroups.forEach(function (group) {  //for each group... 
            group.forEach(function (person1) {//for each person 1 in each group...
                group.forEach(function (person2) {//for each person 2 in each group...
                    let chance;
                    if (person1.isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk && !person2.isInfected) {
                            person2.isInfected = true;
                            itTotalInfected++;
                        }
                    }
                    if (person2.isInfected) {
                        chance = Math.random();
                        if (chance < transmissionRisk && !person1.isInfected) {
                            person1.isInfected = true;
                            itTotalInfected++;
                        }
                    }
                })
            })
        })
        this.totalInfected = itTotalInfected;
    }

    iterate() {
        for (let i = 0; i < 1; i++) {
            this.iteration();
        }
    }

    clearPrint() { 
        console.log(this.totalInfected);
        for (let i = 0; i < this.population; i++) {
            console.log(this.constituents[i]);
        }
        console.log(this.totalInfected);
    }

    clearPrintGroups(){
        let printGroups = this.groups;
        let count = [];
        for (let i = 0; i < 10; i++){
            count[i] = 0;
        }
        printGroups.forEach(function(group){
            console.log(group, "================================");
            group.forEach(function(person){
                count[person.gregarious]++;
            })
        })
        console.log(count);
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
    let testCity = new City(10);
    testCity.generateGroups();
    testCity.injectIllness(1);
    testCity.iterate();
    //testCity.clearPrint();
    //testCity.clearPrintGroups();
    console.log(testCity.constituents);
}

main()