import * as DB from "../databaseconnection"

export type PoliceMan = {
    ID:number,
    Name:string,
    Vorname:string
}

export async function getPolizist(poId: number): Promise<PoliceMan | null> {
    return new Promise(async(resolve,reject) => {
        let resp = await DB.query("SELECT * FROM polizist WHERE id = ?",[poId]);
        if(resp.error){
            reject(resp.error);
            return;
        }
        if(resp.rows.length == 0){
            resolve(null);
            return;
        }
        resolve({
            ID: resp.rows[0].ID,
            Name: resp.rows[0].Name,
            Vorname: resp.rows[0].Vorname
        });
    });
}

export async function createPolizist(Name: string,Vorname: string): Promise<boolean>{
    return new Promise(async(resolve,reject) => {
        let resp = await DB.update("INSERT INTO Polizist (NAME,VORNAME) VALUES(?,?)",[Name,Vorname]);
        if(resp.error){
            reject(resp.error);
            return;
        }else {
            resolve(resp.affectedRows > 0);
        }
    });
}
