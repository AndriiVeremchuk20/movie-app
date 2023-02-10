import { Role } from "@prisma/client";
import { Router, Request, Response } from "express";
import prisma from "../../prisma/index";

const route = Router();

route.get("/users",async (req: Request, res: Response) => {
    try{
        const users = await prisma.user.findMany({});
        const usersWithoudAdmins = users.filter(user=>user.role!==Role.ADMIN);
        res.status(200).send(usersWithoudAdmins);
    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
});

route.post("/movie", (req: Request, res: Response)=>{
    
    try{
        if(!req.files){
            return res.status(403).send({msg: "No file uploaded"});
        }
        
        const movie = req.files.movie;
        
        
    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }  
});

export default route;
