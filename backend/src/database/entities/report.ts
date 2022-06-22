import * as DB from "../databaseconnection"


export type report = {
    ID:number,
    EMAIL_KLAEGER:string,
    NAME_ANGEKLAGTER:string,
    VORNAME_ANGEKLAGTER:string,
    TATDATUM:number,
    GRUND:string
}


export async function createReport(email_klaeger:string,name_angeklagter:string,vorname_angeklagter:string,tatdatum:number,grund:string):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.update("INSERT INTO Anzeige(EMAIL_KLAEGER,NAME_ANGEKLAGTER,VORNAME_ANGEKLAGTER,TATDATUM,GRUND) VALUES(?,?,?,?,?)",[email_klaeger,name_angeklagter,vorname_angeklagter,tatdatum,grund]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        resolve(resp.affectedRows > 0);
    })
}


export async function getReport(ID:number):Promise<report|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Anzeige WHERE ID = ?",[ID]);
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
            EMAIL_KLAEGER:resp.rows[0].EMAIL_KLAEGER,
            NAME_ANGEKLAGTER:resp.rows[0].NAME_ANGEKLAGTER,
            VORNAME_ANGEKLAGTER:resp.rows[0].VORNAME_ANGEKLAGTER,
            TATDATUM:resp.rows[0].TATDATUM,
            GRUND:resp.rows[0].GRUND
        });
    })
}


export async function getAllReports():Promise<report[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Anzeige",[]);
        if(resp.error){
            reject(resp.error_message);
        }
        if(resp.rows[0].length == 0){
            resolve(null);
            return;
        }
        resolve(resp.rows[0]);
    })
}


export async function deleteReport(ID:number):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.update("DELETE FROM Anzeige WHERE ID = ?",[ID]);
        if(resp.error){
            reject(resp.error_message);
        }
        resolve(resp.changedRows > 0);
    })
}




