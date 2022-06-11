import * as DB from "../databaseconnection";

export type adress = {
    id:number,
    plz:number,
    ort:string,
    strasse:string,
    hausnummer?:number,
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
            strasse: resp.rows[0].strasse,
            hausnummer: resp.rows[0].hausnummer==null? "":resp.rows[0].hausnummer,
            zusatz: resp.rows[0].zusatz==null? "":resp.rows[0].zusatz
        })
    })
}

export async function getAdresseByParams(plz:number,ort:string,strasse:string,hausnummer?:number):Promise<adress|null>{
    console.log("TEST");
    return new Promise(async(resolve,reject)=>{
        let query = "SELECT * FROM adresse WHERE PLZ=? AND ORT=? AND STRASSE=?";
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
            id: resp.rows[0].ID,
            plz: resp.rows[0].PLZ,
            ort: resp.rows[0].ORT,
            strasse: resp.rows[0].STRASSE,
            hausnummer: resp.rows[0].HAUSNUMMER==null? "":resp.rows[0].HAUSNUMMER,
            zusatz: resp.rows[0].ZUSATZ==null? "":resp.rows[0].ZUSATZ
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


