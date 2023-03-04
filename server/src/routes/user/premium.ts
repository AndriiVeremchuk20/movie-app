import { Router, Request, Response } from "express";
import prisma from "../../../prisma";

const router = Router();

router.post("/", async(req: Request, res:Response)=>{
    try {
        const {id} = req.currentUser;
        await prisma.user.update({where: {id: id}, data:{isPremium: true}});        

    } catch (e) {
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
})



export default router;
