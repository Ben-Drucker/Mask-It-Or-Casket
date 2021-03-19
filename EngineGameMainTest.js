import {City} from "./engine.js";

function main() {
    let testCity = new City(100000);
    testCity.generateGroups();
    testCity.injectIllness(10);
    testCity.iterate(1);
    console.log("Connections = ", testCity.numOfConnections);
    console.log(testCity.numOfTransmissions, "/", testCity.countEligible(),"/", testCity.population);
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
    // testCity.printGroups();
    // console.log(testCity.sicknessLog);

}

main()