import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import prisma from "../../prisma";
import registrationMiddleware from "../middleware/registration";
import authMiddleware from "../middleware/auth";
import { generateAccessTocken } from "../utils/token";
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
          select:{
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            age: true,
            role: true,
            likes: true,
            viewed: true,
            watchLater: true,
            password: true,
          }
        });

        if (await comparePassword(password, loginUser.password)) {
          const token = generateAccessTocken(loginUser.id, loginUser.role);
          return res.status(201).send({
            token,
            user: {
              firstName: loginUser.firstName,
              lastName: loginUser.lastName,
              age: loginUser.age,
              email: loginUser.email,
              likes: loginUser.likes,
              viewed: loginUser.viewed,
              watchLater: loginUser.watchLater,
            },
          });
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
          viewed: true,
          watchLater: true,
        },
      });
      const token = generateAccessTocken(currUser.id, currUser.role);
      res.status(201).send({
        token,
        user: {
          firstName: currUser.firstName,
          lastName: currUser.lastName,
          email: currUser.email,
          age: currUser.age,
          likes: currUser.likes,
          viewed: currUser.viewed,
          watchLater: currUser.watchLater,
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

export default route;
