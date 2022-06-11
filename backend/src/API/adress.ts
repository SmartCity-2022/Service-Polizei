import * as DB from "../database/entities/adress"
import {Response, Request, Router} from "express";
import {adress, createAdresse, getAdresseByParams} from "../database/entities/adress";
import errors from "./errors";

export const router:Router = Router();

router.post('/create',async(req:Request,res:Response)=>{
    if(!req.body){
        res.status(Number(errors.ADRESSES.ADRESS_CREATION_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_CREATION_ERRORS.IS_EMPTY);
        return;
    }
    const reqBody = {
        PLZ:req.body.PLZ,
        ORT:req.body.ORT,
        STRASSE:req.body.STRASSE,
        HAUSNUMMER:req.body.HAUSNUMMER,
        ZUSATZ:req.body.ZUSATZ
    }
    if(reqBody.PLZ === undefined){
        res.status(Number(errors.ADRESSES.ADRESS_CREATION_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_CREATION_ERRORS.NO_PLZ);
        return;
    }
    if(reqBody.ORT === undefined){
        res.status(Number(errors.ADRESSES.ADRESS_CREATION_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_CREATION_ERRORS.NO_LOCATION);
        return;
    }
    if(reqBody.STRASSE === undefined){
        res.status(Number(errors.ADRESSES.ADRESS_CREATION_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_CREATION_ERRORS.NO_STREET);
        return;
    }
    if(reqBody.HAUSNUMMER != undefined && isNaN(reqBody.HAUSNUMMER)){
        res.status(Number(errors.ADRESSES.ADRESS_CREATION_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_CREATION_ERRORS.WRONG_TYPE_FOR_HOUSENUMBER);
        return;
    }
    const resp:boolean = await createAdresse(reqBody.PLZ,reqBody.ORT,reqBody.STRASSE,reqBody.HAUSNUMMER,reqBody.ZUSATZ);
    if(!resp){
        res.status(errors.ADRESSES.ADRESS_CREATION_ERRORS.status)
            .json(errors.ADRESSES.ADRESS_CREATION_ERRORS.general);
        return
    }
    res.status(200).json(resp);
})


router.get('/byparams', async(req:Request,res:Response)=>{
    console.log("tetstetetststst");
    if(!req.body){
        res.status(Number(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.IS_EMPTY);
        return;
    }
    const reqBody = {
        PLZ:req.body.PLZ,
        ORT:req.body.ORT,
        STRASSE:req.body.STRASSE,
        HAUSNUMMER:req.body.HAUSNUMMER,
    }
    if(reqBody.PLZ === undefined){
        res.status(Number(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.NO_PLZ);
        return;
    }
    if(reqBody.ORT === undefined){
        res.status(Number(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.NO_LOCATION);
        return;
    }
    if(reqBody.STRASSE === undefined){
        res.status(Number(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.NO_STREET);
        return;
    }
    if(reqBody.HAUSNUMMER != undefined && isNaN(reqBody.HAUSNUMMER)){
        res.status(Number(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.status))
            .json(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.WRONG_TYPE_FOR_HOUSENUMBER);
        return;
    }
    const resp:adress|null = await getAdresseByParams(reqBody.PLZ,reqBody.ORT,reqBody.STRASSE,reqBody.HAUSNUMMER);
    if(resp == null){
        res.status(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.NOT_FOUND.status)
            .json(errors.ADRESSES.ADRESS_BY_PARAMS_ERRORS.NOT_FOUND);
        return
    }
    res.status(200).json(resp);
})


router.get('/:id',async(req:Request,res:Response)=>{
    const id:number = Number(req.params.id);
    if(!isNaN(id)){
        const resp:adress|null = await DB.getAdresse(id);
        if(resp){
            res.status(200).json(resp);
            return;
        }
        res.status(404).json(errors.ADRESSES.ADRESS_NOT_FOUND);
        return;
    }
    res.status(400).json(errors.ADRESSES.ADRESS_ID_NOT_FOUND);
});