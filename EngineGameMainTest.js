import {City} from "./engine.js";

function main() {
    let testCity = new City(1000);
    testCity.generateGroups();
    testCity.injectIllness(200);
    testCity.iterate(50);
    console.log("Connections = ", testCity.numOfConnections);
    console.log(testCity.numOfTransmissions, "/", testCity.countEligible(),"/", testCity.population);
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
    // testCity.printGroups();
    // console.log(testCity.sicknessLog);

}

main()