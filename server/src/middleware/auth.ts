import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from "../utils/token";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ msg: "Not authorized" });
    }
    const tokenData = decodeAccessToken(token.split(" ")[1]); //Authorization: Bearer <token>
    req.currentUser = tokenData;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
};

export default authMiddleware;
