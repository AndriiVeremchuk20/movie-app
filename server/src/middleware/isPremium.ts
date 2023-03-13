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

    console.log(token)

    if (!token) {
      req.currentUser = {...req.currentUser, isPremium: false};
      return next();
    }
   
    const tokenData = decodeAccessToken(token.split(" ")[0]);
    console.log(tokenData);
    req.currentUser = tokenData;
    next();
  
} catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
};

export default isPremiumMiddleware;
