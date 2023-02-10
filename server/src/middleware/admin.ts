import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from "../utils/token";

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization;

        if (!token) {
          return res.status(401).send({ msg: "Not authorized" });
        }

        const tokenData = decodeAccessToken(token.split(" ")[1]); //Authorization: Bearer <token>
        
        if(tokenData.role !== Role.ADMIN){
            return res.status(403).send({ msg: "Access denied" });
        }

        req.currentUser = tokenData;
        next();

    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
};

export default adminMiddleware;
