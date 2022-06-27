import * as DB from "../database/entities/news"
import {Response, Request, Router} from "express";
import errors from "./errors";

export const router:Router = Router();


router.get("/", async(req:Request, res:Response) =>{
    const resp:any|null = await DB.getAllNews();
    res.status(200).json(resp);
})