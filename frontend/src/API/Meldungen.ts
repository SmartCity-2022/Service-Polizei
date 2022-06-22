import config from "../config";

export type accident={
    ID:number,
    DATE:number,
    ADRESSEN_ID:number,
}

export async function getAllAccidents():Promise<accident[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp:Response = await fetch(config.BACKEND_ADDRESS+config.API_ENDPOINTS.ACCIDENTS,{
            method:"GET",
        });
        resolve(resp.json());
    })
}


