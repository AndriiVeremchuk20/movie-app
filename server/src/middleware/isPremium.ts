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

    if (token) {
      try {
        const tokenData = decodeAccessToken(token.split(" ")[1]);
        req.currentUser = tokenData;
        req.isPremiumUser = req.currentUser.isPremium;
        return next();
      } catch (e) {
        req.isPremiumUser = false;
        return next();
      }
    }

    req.isPremiumUser = false;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
};

export default isPremiumMiddleware;
