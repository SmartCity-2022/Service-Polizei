import * as DB from "../database/entities/trafficjam"
import {Response, Request, Router} from "express";
import {trafficjam} from "../database/entities/trafficjam";
import errors from "./errors";

export const router:Router = Router();

router.get("/:id",async(req:Request,res:Response)=>{
    const id:number = Number(req.params.id);
    if(!isNaN(id)){
        const resp:trafficjam|null = await DB.getTrafficJam(id);
        if(resp){
            res.status(200).json(resp);
            return;
        }
        res.status(errors.ACCIDENTS.ACCIDENT_ID_NOT_FOUND.status)
            .json(errors.ACCIDENTS.ACCIDENT_ID_NOT_FOUND.description);
        return;
    }
    res.status(400).json(errors.general);
})

router.post("/create",async(req:Request,res:Response)=>{
    if(!req.body){
        res.status(errors.ACCIDENTS.ACCIDENT_CREATION_ERRORS.INVALID_BODY.status)
            .json(errors.ACCIDENTS.ACCIDENT_CREATION_ERRORS.INVALID_BODY.description);
        return;
    }
    const body = req.body;

    let resp = await DB.createTrafficJam(body.DATE,body.PLZ,body.ORT,body.STRASSE,body.HAUSNUMMER,body.ZUSATZ);
    if(resp){
        res.status(200).json(resp);
    }
})