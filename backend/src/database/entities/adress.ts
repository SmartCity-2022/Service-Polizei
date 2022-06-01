import * as DB from "../databaseconnection";
import {rejects} from "assert";
import * as QueryString from "querystring";

export type adress = {
    id:number,
    plz:number,
    ort:string,
    straße:string,
    hausnummer?:string,
    zusatz?:string
}

export async function getAdresse(id:number): Promise<adress|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Adresse WHERE id = ?",[id]);
        if(resp.error){
            reject(resp.error);
            return;
        }
        resolve({
            id: resp.rows[0].id,
            plz: resp.rows[0].plz,
            ort: resp.rows[0].ort,
            straße: resp.rows[0].straße,
            hausnummer: resp.rows[0].hausnummer==null? "":resp.rows[0].hausnummer,
            zusatz: resp.rows[0].zusatz==null? "":resp.rows[0].zusatz
        })
    })
}

export async function getAdresseByParams(plz:string,ort:string,straße:string,hausnummer?:string):Promise<adress|null>{

    return new Promise(async(resolve,reject)=>{
        let query = "SELECT * FROM adresse WHERE plz=? AND WHERE ort=? AND straße=?";
        let params =[plz,ort,straße]
        if(hausnummer != undefined){
            query += "AND WHERE hausnummer =?";
            params.push(hausnummer);
        }
        let resp = await DB.query(query,params);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        resolve({
            id: resp.rows[0].id,
            plz: resp.rows[0].plz,
            ort: resp.rows[0].ort,
            straße: resp.rows[0].straße,
            hausnummer: resp.rows[0].hausnummer==null? "":resp.rows[0].hausnummer,
            zusatz: resp.rows[0].zusatz==null? "":resp.rows[0].zusatz
        });
    });
}

export async function createAdresse(plz:string,ort:string,straße:string,hausnummer?:string,zusatz?:string): Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.update("INSERT INTO Adresse(PLZ,ORT,STRASSE,HAUSNUMMER,ZUSATZ) VALUES(?,?,?,?,?)",[plz,ort,straße,hausnummer,zusatz]);
        if(resp.error){
            reject(resp.error);
            console.log(resp.error_message);
            return;
        }
        console.log("TEST");
        resolve(resp.changedRows > 0);
    })
}


