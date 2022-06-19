import * as DB from "../databaseconnection"
import {adress, createAdresse, getAdresseByParams} from "./adress";

export type wantedPerson = {
    ID:number,
    NAME:string,
    VORNAME:string,
    ADRESSEN_ID:number,
    BESCHREIBUNG:string,
    TAETERBILD:string
}


export async function createWantedPerson(name:string,vorname:string,beschreibung:string,taeterbild:string,
                                         plz:number,ort:string,strasse:string,hausnummer:number,zusatz?:string):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let adresstest:adress | null = await getAdresseByParams(plz,ort,strasse,hausnummer);

        let adressId = 0;
        if(adresstest == null){
            let test = await createAdresse(plz,ort,strasse,hausnummer,zusatz);
            if(test){
                await getAdresseByParams(plz,ort,strasse,hausnummer).then((value)=> {
                    value != null ? adressId = value.ID : adressId = 0;

                });
            }
        }else{
            adressId = adresstest.ID;
        }
        let resp = await DB.update("INSERT INTO Gesuchte_Person(NAME,VORNAME,ADRESSEN_ID,BESCHREIBUNG,TAETERBILD) VALUES (?,?,?,?,?)",[name,vorname,adressId,beschreibung,taeterbild]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        resolve(resp.changedRows > 0);
    });
}


export async function getWantedPerson(ID:number):Promise<wantedPerson|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Gesuchte_Person WHERE ID=?",[ID]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        if(resp.rows.length == 0){
            resolve(null);
            return;
        }
        resolve({
            ID:resp.rows[0].ID,
            NAME:resp.rows[0].NAME,
            VORNAME:resp.rows[0].VORNAME,
            ADRESSEN_ID:resp.rows[0].ADRESSEN_ID,
            BESCHREIBUNG:resp.rows[0].BESCHREIBUNG,
            TAETERBILD:resp.rows[0].TAETERBILD
        })
    });
}


export async function getAllWantedPersons():Promise<wantedPerson[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Gesuchte_Person",[]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        if(resp.rows.length == 0){
            resolve(null);
            return;
        }
        resolve(resp.rows[0]);
    });
}


export async function deleteWantedPerson(ID:number):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.update("DELETE FROM TABLE gesuchte_Person WHERE ID = ?",[ID]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        resolve(resp.affectedRows > 0);
    });
}