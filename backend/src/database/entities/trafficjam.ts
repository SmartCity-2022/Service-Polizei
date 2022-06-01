import * as DB from "../databaseconnection"
import {getAdresse, createAdresse, getAdresseByParams} from "./adress";

export type trafficjam={
    id:number,
    date:number,
    adressId:number,
}

export async function createTrafficJam(date:number,plz:string,ort:string,strasse:string,hausnummer?:string,zusatz?:string):Promise<number|null>{
    return new Promise(async(resolve,reject)=>{
        let adress = await getAdresseByParams(plz,ort,strasse,hausnummer);
        let adressId = 0;
        if(adress == null){
           // await createAdresse(plz,ort,strasse,hausnummer,zusatz).then((value)=> {value !=null?adressId = value:adressId = 0;});
        }else{
            adressId = adress.id;
        }
        let resp = await DB.update("INSERT INTO Stau(DATUM,ADRESSEN_ID) VALUES(?,?)",[date,adressId]);
        if(resp.error){
            reject(resp.error);
            return;
        }
        resolve(resp.rows[0].id);
    })
}