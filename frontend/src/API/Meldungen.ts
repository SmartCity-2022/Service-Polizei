import config from "../config";

export type accident={
    ID:number,
    TIMESTAMP:number,
    PLZ:number,
    ORT:string,
    STRASSE:string,
    HAUSNUMMER:number,
    ZUSATZ:string
}


export type traffic_jam={
    ID:number,
    TIMESTAMP:number,
    PLZ:number,
    ORT:string,
    STRASSE:string,
    HAUSNUMMER:number,
    ZUSATZ:string
}


export type news={
    ID:number,
    TIMESTAMP:number,
    TITEL:string,
    TEXT:string,
    TITELBILD:string,
    NAME:string,
    VORNAME:string
}


export async function getFullAccidents():Promise<accident[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await (await fetch(config.BACKEND_ADDRESS + config.API_ENDPOINTS.ACCIDENTS+"/full/all", {
            method: "GET",
        })).json() as accident[];

        resolve(resp);
    })
}


export async function getFullTraffic_Jams():Promise<traffic_jam[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await (await fetch(config.BACKEND_ADDRESS + config.API_ENDPOINTS.TRAFFIC_JAM+"/full/all", {
            method: "GET",
        })).json() as traffic_jam[];

        resolve(resp);
    })
}


export async function getAllNews():Promise<news[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp = await(await fetch(config.BACKEND_ADDRESS+config.API_ENDPOINTS.NEWS+"/",{
            method:"GET"
        })).json() as news[];

        resolve(resp);
    })
}


export async function createAccident(plz:number, ort:string, strasse:string, hausnummer:number, zusatz:string):Promise<boolean> {
    return new Promise(async (resolve, reject) => {

        let resp = await fetch(config.BACKEND_ADDRESS + config.API_ENDPOINTS.ACCIDENTS + "/create", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "PLZ": plz,
                "ORT": ort,
                "STRASSE": strasse,
                "HAUSNUMMER": hausnummer,
                "ZUSATZ": zusatz
            })
        })

        resolve(resp.status == 200);
    })
}


export async function createTrafficJam(plz:number, ort:string, strasse:string, hausnummer:number, zusatz:string):Promise<boolean>{
    return new Promise(async(resolve,reject)=>{

        let resp = await fetch(config.BACKEND_ADDRESS+config.API_ENDPOINTS.TRAFFIC_JAM+"/create",{
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({
                "PLZ": plz,
                "ORT": ort,
                "STRASSE": strasse,
                "HAUSNUMMER": hausnummer,
                "ZUSATZ": zusatz
            })
        })

        resolve(resp.status == 200);
    })
}


