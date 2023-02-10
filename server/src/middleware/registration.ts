import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma";

const registrationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const { email } = req.body;

    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
     return next();
    }

    res.status(409).send({ msg: `User with email: ${email} alredy exist` });

  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
};

export default registrationMiddleware;
