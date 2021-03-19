//import {City} from "./engine.js";

function main() {
    let testCity = new City(1000);
    testCity.generateGroups();
    testCity.injectIllness(10);
    testCity.iterate(120);
    console.log("Total number of connections = ", testCity.numOfConnections);
    console.log(testCity.numOfTransmissions, "were infected /", testCity.countEligible()," could have been infected/", "out of", testCity.population);
    //testCity.printGroups();
    // for(let i = 0; i< testCity.sicknessLog.length; i++){
    //     console.log(testCity.sicknessLog[i]);
    // }
    //console.log(testCity.groups);
}

main()