import * as policeTest from "./entities/policeMan";
import {getPolizist, PoliceMan} from "./entities/policeMan";
import * as adressTest from "./entities/adress";
import {adress, getAdresse} from "./entities/adress";
import {createTrafficJam, getAllTrafficJams, trafficjam, trafficJamList} from "./entities/trafficjam";
import {accident, createAccident, getAllAccidents} from "./entities/accident";

async function doPoliceTest() {
    await policeTest.createPolizist("test", "test");

    const policeMan: Promise<PoliceMan | null> = getPolizist("1");

    policeMan.then((value) => console.log(value));
}

async function doAdressTest(){
    await adressTest.createAdresse(32457,"Porta Westfalica","Rintelner Straße",25);
    const testAdress: Promise<adress|null> = getAdresse(1);
    testAdress.then((value)=> console.log("adressTest: \n"+value));
}

async function doTrafficJamTest(){
    /*createTrafficJam(0,32423,"Minden","Letelner Straße",79).catch((value)=>{
        console.error(value);
    });
    createTrafficJam(1,32457,"Porta","Rintelner Straße",25);*/

    const trafficlist:trafficjam[]|null = await getAllTrafficJams();
    if (trafficlist) {
        console.log(trafficlist);
    }
}

async function doAccidentTest(){
    await createAccident(1,32423,"Minden","Letelner Straße",79);
    await createAccident(0,32457,"Porta-Westfalica","Rintelner Straße",25);
    await createAccident(2,32423,"Minden","Meinser Brink",12);

    const accidentsList:accident[]|null = await getAllAccidents();

    if(accidentsList){
        console.log(accidentsList);
    }
}

doAccidentTest();