import * as DB from "../databaseconnection";

export type news = {
    ID:number,
    POLIZIST_ID:number,
    TIMESTAMP:number,
    TITEL:string,
    PO_ID:number,
    TEXT:string,
    TITELBILD:string
}


export async function createNews(polizist_id:number,datum:number,titel:string,text:string,titelbild:string):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.update("INSERT INTO Neuigkeit(POLIZIST_ID,TIMESTAMP,TITEL,TEXT,TITELBILD) VALUES(?,?,?,?,?)",[polizist_id,datum,titel,text,titelbild]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        resolve(resp.changedRows > 0);
    })
}


export async function deleteNews(id:number):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.update("DELETE FROM Neuigkeit WHERE ID = ?",[id]);
        if(resp.error){
            reject(resp.error_message);
            return;
        }
        resolve(resp.changedRows > 0);
    })
}


export async function getAllNews():Promise<news[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await DB.query("SELECT * FROM Neuigkeit,Polizist WHERE Neuigkeit.POLIZIST_ID = Polizist.ID",[]);
        if(resp.error){
            reject(resp.error_message);
        }
        if(resp.rows.length == 0){
            resolve(null);
            return;
        }
        resolve(resp.rows);
    })
}

