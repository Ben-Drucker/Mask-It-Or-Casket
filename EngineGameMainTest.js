import {City} from "./engine.js";

function main() {
    let testCity = new City();
    testCity.generateGroups();
    testCity.injectIllness(3);
    testCity.iterate(10);
    console.log("Connections = ", testCity.numOfConnections);
    console.log(testCity.numOfTransmissions, "were infected /", testCity.countEligible()," could have been infected/", "out of", testCity.population);
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
    // testCity.printGroups();
    for(let i = 0; i< testCity.sicknessLog.length; i++){
        console.log(testCity.sicknessLog[i]);
    }
}

main()