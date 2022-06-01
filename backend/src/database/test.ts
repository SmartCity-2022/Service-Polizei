import * as policeTest from "./entities/policeMan";
import {getPolizist, PoliceMan} from "./entities/policeMan";
import * as adressTest from "./entities/adress";
import {adress, getAdresse} from "./entities/adress";
import {createTrafficJam} from "./entities/trafficjam";

async function doPoliceTest() {
    await policeTest.createPolizist("test", "test");

    const policeMan: Promise<PoliceMan | null> = getPolizist("1");

    policeMan.then((value) => console.log(value));
}

async function doAdressTest(){
    await adressTest.createAdresse("32457","Porta Westfalica","Rintelner Straße","25");
    const testAdress: Promise<adress|null> = getAdresse(1);
    testAdress.then((value)=> console.log("adressTest: \n"+value));
}

function doTrafficJamTest(){
    createTrafficJam(0,"32423","Minden","Letelner Straße","79").catch((value)=>{
        console.error(value);
    });
}

//doTrafficJamTest();
doAdressTest();