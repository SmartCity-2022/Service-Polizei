import MySQL from "mysql";
import * as fs from "fs";


export type DBconfig = {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    supportBigNumbers?: boolean,
    connectionLimit?: number
}

type QueryResponse = {
    error: boolean,
    error_message: string,
    rows: any[]
}

type UpdateResponse = {
    error: boolean,
    error_message: string,
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    warningCount: number,
    message: string,
    changedRows: number,
    rows?:any
}

//export const config: DBconfig = JSON.parse(fs.readFileSync("./database/database.json","utf-8"));
import * as config from "./database.json";


const pool : MySQL.Pool = MySQL.createPool({
    host: config.host,
    port: config.port as unknown as number,
    user: config.username,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit,
    supportBigNumbers: config.supportBigNumbers
})


/*export async function setup(): Promise<void> {
    return new Promise<void>(async (resolve,reject) =>{
        for(const script of create)
    })
}*/

export async function query(sql : string, params : any[]) : Promise<QueryResponse> {
    return new Promise<any>(async (resolve,reject) => {
        pool.query(sql, params, (err,result) => {
            if(err) {
                resolve({error: true, error_message: err.message, rows: []});
            } else {
                resolve({error: false, error_message: "", rows: result});
            }
        });
    });
}

export async function update(sql : string, params: any[]): Promise<UpdateResponse>{
    return new Promise<any>(async (resolve, reject) => {
        pool.query(sql, params, (err,result) => {
            if(err){
                resolve({error: true, error_message: err.message, fieldCount: 0, affectedRows: 0,insertId: 0,warningCount:0,message:" ",changedRows:0});
                console.log(err.message);
            }else{
                resolve({error: false, error_message: "", fieldCount: result.fieldCount, affectedRows: result.affectedRows,insertId: result.insertId,warningCount:result.warningCount,message:result.message,changedRows:result.changedRows,rows:result});
            }
        });
    });
}