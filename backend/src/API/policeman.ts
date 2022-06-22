import * as DB from "../database/entities/policeMan"
import {Response, Request, Router} from "express";
import {PoliceMan} from "../database/entities/policeMan";
import errors from "./errors";

export const router:Router = Router();

router.get('/:id',async(req:Request,res:Response)=>{
    const id:number = Number(req.params.id);
    if(!isNaN(id)){
        const out:PoliceMan|null = await DB.getPolizist(id);
        if(out){
            res.status(200).json(out);
            return;
        }
        res.status(404).json(errors.POLICEMAN.POLICEMAN_NOT_FOUND);
        return;
    }
    res.status(400).json(errors.POLICEMAN.POLICEMAN_NO_ID_FOUND);
});

router.post("/create", async(req:Request,res:Response)=>{
    if(!req.body){
        res.status(Number(errors.POLICEMAN.POLICEMAN_CREATION_ERRORS.status))
            .json(errors.POLICEMAN.POLICEMAN_CREATION_ERRORS.IS_EMPTY);
        return;
    }
    const reqBody = {
        Name:req.body.Name,
        Vorname:req.body.Vorname,
    }
    if(reqBody.Name === undefined){
        res.status(Number(errors.POLICEMAN.POLICEMAN_CREATION_ERRORS.NO_NAME.status))
            .json(errors.POLICEMAN.POLICEMAN_CREATION_ERRORS.NO_NAME);
        return;
    }
    if(reqBody.Vorname === undefined){
        res.status(Number(errors.POLICEMAN.POLICEMAN_CREATION_ERRORS.NO_FIRSTNAME.status))
            .json(errors.POLICEMAN.POLICEMAN_CREATION_ERRORS.NO_FIRSTNAME);
        return;
    }

    const resp:boolean = await DB.createPolizist(reqBody.Name,reqBody.Vorname);
    if(!resp){
        res.status(Number(errors.POLICEMAN.POLICEMAN_CREATION_ERRORS.status))
            .json("something went wrong");
        return;
    }
    res.status(200).json(resp);
})
