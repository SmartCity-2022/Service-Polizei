import * as DB from "../databaseconnection"
import {getAdresse, createAdresse, getAdresseByParams,adress} from "./adress";


export type accident={
    ID:number,
    TIMESTAMP:number,
    ADRESSEN_ID:number,
}


export type fullAccident={
    ID:number,
    TIMESTAMP:number,
    PLZ:number,
    WOHNORT:string,
    STRASSE:string,
    HAUSNUMMER?:number,
    ZUSATZ?:string
}

export async function createAccident(timestamp:number,plz:number,ort:string,strasse:string,hausnummer?:number,zusatz?:string):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{

        let adresstest:adress | null = await getAdresseByParams(plz,ort,strasse,hausnummer);

        let adressId = 0;
        if(adresstest == null){
            let test = await createAdresse(plz,ort,strasse,hausnummer,zusatz);
            console.log(test);
            if(test){
                await getAdresseByParams(plz,ort,strasse,hausnummer).then((value)=> {
                    value != null ? adressId = value.ID : adressId = 0;

                });
            }
        }else{
            adressId = adresstest.ID;
        }

        let resp = await DB.update("INSERT INTO Unfall(TIMESTAMP,ADRESSEN_ID) VALUES(?,?)",[timestamp,adressId]);
        if(resp.error){
            reject(resp.error);
            return;
        }
        resolve(resp.changedRows > 0);
    })
}

export async function getAccident(id:number):Promise<accident|null>{
    return new Promise(async (resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Unfall WHERE ID = ?",[id]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        if(resp.rows.length == 0){
            reject(null)
            return;
        }
        resolve({
            ID: resp.rows[0].ID,
            TIMESTAMP: resp.rows[0].TIMESTAMP,
            ADRESSEN_ID: resp.rows[0].ADRESSEN_ID
        })
    });
}

export async function getAllAccidents():Promise<accident[]|null>{
    return new Promise(async(resolve,reject)=> {
        let resp = await DB.query("SELECT * FROM Unfall", []);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        if(resp.rows.length == 0){
            resolve(null);
            return;
        }
        resolve(
            resp.rows
        );
    })
}


export async function getFullAccidents():Promise<fullAccident[]|null>{
    return new Promise(async(resolve,reject)=> {
        let resp = await DB.query("SELECT * FROM Unfall,Adresse WHERE Unfall.ADRESSEN_ID = Adresse.ID", []);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        if(resp.rows.length == 0){
            resolve(null);
            return;
        }
        resolve(
            resp.rows
        );
    })
}