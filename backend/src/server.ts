import {router as policemanRouter} from "./API/policeman";
import {router as adressRouter} from "./API/adress";

const express = require('express');
export const app = express();


export async function start(port:string){
    app.use(express.json());
    app.use("/policeman",policemanRouter);
    app.use("/adresses",adressRouter);
    app.listen(port, () =>{
        console.log(`listening on port ${port}`);
    });
}

start("8088");



