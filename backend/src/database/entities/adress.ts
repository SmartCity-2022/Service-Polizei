import * as DB from "../databaseconnection";

export type adress = {
    ID:number,
    PLZ:number,
    ORT:string,
    STRASSE:string,
    HAUSNUMMER?:number,
    ZUSATZ?:string
}

export async function getAdresse(id:number): Promise<adress|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Adresse WHERE id = ?",[id]);
        if(resp.error){
            reject(resp.error);
            return;
        }
        resolve({
            ID: resp.rows[0].ID,
            PLZ: resp.rows[0].PLZ,
            ORT: resp.rows[0].ORT,
            STRASSE: resp.rows[0].STRASSE,
            HAUSNUMMER: resp.rows[0].HAUSNUMMER==null? null:resp.rows[0].HAUSNUMMER,
            ZUSATZ: resp.rows[0].ZUSATZ==null? "":resp.rows[0].ZUSATZ

        })
    })
}

export async function getAdresseByParams(plz:number,ort:string,strasse:string,hausnummer?:number):Promise<adress|null>{
    console.log("TEST");
    return new Promise(async(resolve,reject)=>{
        let query = "SELECT * FROM Adresse WHERE PLZ=? AND ORT=? AND STRASSE=?";
        let params =[plz,ort,strasse]
        if(hausnummer != undefined){
            query += "AND HAUSNUMMER =?";
            params.push(hausnummer);
        }

        let resp = await DB.query(query,params);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        if(resp.rows.length == 0){
            console.log("EMPTY");
            resolve( null);
            return;
        }
        console.log("SUCCESS");
        resolve({
            ID: resp.rows[0].ID,
            PLZ: resp.rows[0].PLZ,
            ORT: resp.rows[0].ORT,
            STRASSE: resp.rows[0].STRASSE,
            HAUSNUMMER: resp.rows[0].HAUSNUMMER==null? null:resp.rows[0].HAUSNUMMER,
            ZUSATZ: resp.rows[0].ZUSATZ==null? "":resp.rows[0].ZUSATZ
        });
        return;
    });
}

export async function createAdresse(plz:number,ort:string,strasse:string,hausnummer?:number,zusatz?:string): Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.update("INSERT INTO Adresse(PLZ,ORT,STRASSE,HAUSNUMMER,ZUSATZ) VALUES(?,?,?,?,?)",[plz,ort,strasse,hausnummer,zusatz]);
        if(resp.error) {
            reject(resp.error);
            return;
        }
        resolve(resp.affectedRows > 0);
    });
}


