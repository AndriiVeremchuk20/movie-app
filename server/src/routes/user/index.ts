import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { comparePassword, hashPassword } from "../../utils/hashPassword";
import prisma from "../../../prisma";
import registrationMiddleware from "../../middleware/registration";
import authMiddleware from "../../middleware/auth";
import { generateAccessTocken } from "../../utils/token";
import avatarRoute from "./avatar";
import likeRoute from "./like";
import watchLaterRoute from "./watchLater";
import commentsRoute from "./comments";
import premiumRoute from "./premium";
//import { Role } from "@prisma/client"; // use to set admin

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).send({ users });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.post(
  "/registration",
  [
    check("firstName", "First name required").isLength({ min: 1, max: 20 }),
    check("lastName", "First name required").isLength({ min: 1, max: 20 }),
    check("age", "Uncorrect age").isInt({ min: 1, max: 100 }),
    check("email", "Uncorrect email").normalizeEmail().isEmail(),
  ],
  registrationMiddleware,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ msg: "Uncorrect request body", errors });
      }

      const { firstName, lastName, email } = req.body;
      const password = hashPassword(req.body.password);
      const age = parseInt(req.body.age);

      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          age,
          email,
          password,
        },
      });

      console.log("add new user" + newUser.firstName);

      res.status(201).send({ msg: "Registration complete" });
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Server error" });
    }
  }
);

route.post(
  "/login",
  [
    check("email", "Uncoorrect email").normalizeEmail().isEmail(),
    check("password", "Invalid password").isLength({ min: 4, max: 18 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      try {
        const loginUser = await prisma.user.findFirstOrThrow({
          where: {
            email: email,
          },
          select: {
            id: true,
            role: true,
            password: true,
            isPremium: true,
          },
        });

        if (await comparePassword(password, loginUser.password)) {
          const token = generateAccessTocken(loginUser.id, loginUser.role, loginUser.isPremium);
          return res.status(201).send({ token });
        }

        res.status(401).send({ msg: "Invalid password" });
      } catch (e) {
        console.log(e);
        res.status(404).send({ msg: `User with email ${email} not found.` });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Server error" });
    }
  }
);

route.get("/auth", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser;

    try {
      const currUser = await prisma.user.findFirstOrThrow({
        where: { id: id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          age: true,
          role: true,
          likes: true,
          watchLater: true,
          Watched: true,
          avatarPath: true,
          isPremium: true,
        },
      });
      const token = generateAccessTocken(currUser.id, currUser.role, currUser.isPremium);
      res.status(201).send({
        token,
        user: {
          id: currUser.id,
          firstName: currUser.firstName,
          lastName: currUser.lastName,
          email: currUser.email,
          age: currUser.age,
          watched: currUser.Watched.length,
          likes: currUser.likes.map((like) => like.movieId),
          watchLater: currUser.watchLater.map((item) => item.movieId),
          avatarPath: currUser.avatarPath,
          isPremium: currUser.isPremium,
          role: currUser.role,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(404).send({ msg: "User not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.delete("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser;

    await prisma.user.delete({where:{
      id
    }});

    res.status(203).send({msg: "Accoutn deleted"});

  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.use("/avatar", authMiddleware, avatarRoute);
route.use("/likes", authMiddleware, likeRoute);
route.use("/watch-later", authMiddleware, watchLaterRoute);
route.use("/comments", authMiddleware, commentsRoute);
route.use("/premium", premiumRoute);

export default route;
