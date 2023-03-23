import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from "../utils/token";

const isPremiumMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization;

    if (!token) {
      req.currentUser = {...req.currentUser, isPremium: false};
      return next();
    }
   
    const tokenData = decodeAccessToken(token.split(" ")[0]);
    req.currentUser = tokenData;
    next();
  
} catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
};

export default isPremiumMiddleware;
