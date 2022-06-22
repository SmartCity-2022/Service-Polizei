import * as DB from "../database/entities/wanted_person"
import {Response, Request, Router} from "express";
import {wantedPerson} from "../database/entities/wanted_person";
import errors from "./errors";

export const router:Router = Router();


router.get("/:id",async(res:Response,req:Request)=>{
    const id:number = Number(req.params.id);
    if(!isNaN(id)){
        const resp:wantedPerson|null = await DB.getWantedPerson(id);
        if(resp){
            res.status(200).json(resp);
            return;
        }
        res.status(errors.WANTED_PERSON.WANTED_PERSON_ID_NOT_FOUND.status)
            .json(errors.WANTED_PERSON.WANTED_PERSON_ID_NOT_FOUND.description);
        return;
    }
    res.status(400).json(errors.general);
})


router.get("/",async(res:Response,req:Request)=>{
    const wantedPersons: wantedPerson[]|null = await DB.getAllWantedPersons();
    res.status(200).json(wantedPersons);
})


router.post("/create",async(res:Response,req:Request)=>{
    if(!req.body){
        res.status(errors.WANTED_PERSON.WANTED_PERSON_CREATION_ERRORS.INVALID_BODY.status)
            .json(errors.WANTED_PERSON.WANTED_PERSON_CREATION_ERRORS.INVALID_BODY.description);
        return;
    }
    const body = req.body;

    let resp = await DB.createWantedPerson(body.NAME,body.VORNAME,body.BESCHREIBUNG,body.TAETERBILD,body.PLZ,body.ORT,body.STRASSE,body.HAUSNUMMER,body.ZUSATZ);
    if(resp){
        res.status(200).json(resp);
        return;
    }
    res.status(400).json(errors.general);
})


router.delete("/delete/:id",async(res:Response,req:Request)=>{
    const id:number = Number(req.params.id);
    if(!isNaN(id)){
        const resp = await DB.deleteWantedPerson(id);
        if(resp){
            res.status(200).json(resp);
            return;
        }
        res.status(errors.WANTED_PERSON.WANTED_PERSON_ID_NOT_FOUND.status)
            .json(errors.WANTED_PERSON.WANTED_PERSON_ID_NOT_FOUND.description);
        return;
    }
    res.status(400).json(errors.general);
})
