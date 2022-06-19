const APIENDPOINT = "https://127.0.0.1:8088/accidents"

export type accident={
    ID:number,
    DATE:number,
    ADRESSEN_ID:number,
}

export async function getAllAccidents():Promise<accident[]|null>{
    return new Promise(async(resolve,reject)=>{
        let resp:Response = await fetch("http://127.0.0.1:8088/accidents/",{
            method:"GET",
        });
        console.log(resp.json());
    })
}