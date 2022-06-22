import * as DB from "../database/entities/report"
import {Response, Request, Router} from "express";
import {report} from "../database/entities/report";
import errors from "./errors";


export const router:Router = Router();


router.get("/:id",async(res:Response,req:Request)=>{
    const id:number = Number(req.params.id);
    if(!isNaN(id)){
        const resp:report|null = await DB.getReport(id);
        if(resp){
            res.status(200).json(resp);
            return;
        }
        res.status(errors.REPORT.REPORT_ID_NOT_FOUND.status)
            .json(errors.REPORT.REPORT_ID_NOT_FOUND.description);
        return;
    }
    res.status(400).json(errors.general);
})


router.get("/",async(res:Response,req:Request)=>{
    const reports: report[]|null = await DB.getAllReports();
    res.status(200).json(reports);
})


router.post("/create", async(res:Response,req:Request)=>{
    if(!req.body){
        res.status(errors.REPORT.REPORT_CREATION_ERRORS.INVALID_BODY.status)
            .json(errors.REPORT.REPORT_CREATION_ERRORS.INVALID_BODY.description);
    }
    const body = req.body;

    let resp = await DB.createReport(body.EMAIL_KLAEGER,body.NAME_ANGEKLAGTER,body.VORNAME_ANGEKLAGTER,body.TATDATUM,body.GRUND);
    if(resp){
        res.status(200).json(resp);
        return;
    }
    res.status(400).json(errors.general);
})


router.delete("/create/:id", async(res:Response,req:Request)=>{
    const id:number = Number(req.params.id);
    if(!isNaN(id)){
        const resp = await DB.deleteReport(id);
        if(resp){
            res.status(200).json(resp);
            return;
        }
        res.status(errors.REPORT.REPORT_ID_NOT_FOUND.status)
            .json(errors.REPORT.REPORT_ID_NOT_FOUND.description);
        return;
    }
    res.status(400).json(errors.general);
})
