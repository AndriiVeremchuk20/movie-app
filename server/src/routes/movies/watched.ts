import { Router, Request, Response } from "express";
import prisma from "../../../prisma";
import isAuthUserMiddleware from "../../middleware/isAuthUser";

const route = Router();

route.post(
  "/:id",
  isAuthUserMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.currentUser;
      const movieId = req.params.id;
      const { ip } = req.body;

      try {
        const addedWatching = await prisma.watched.create({
          data: {
            ip: ip,
            userId: user ? user.id : undefined,
            movieId,
          },
        });
        
        res.status(201).send(addedWatching);
      } catch (e) {
        console.log(e);
        res.status(400).send({ msg: "Movie alredy watched" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Server error" });
    }
  }
);

export default route;
