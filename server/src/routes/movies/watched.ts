import { Router, Request, Response } from "express";
import prisma from "../../../prisma";
import authMiddleware from "../../middleware/auth";
import isAuthUserMiddleware from "../../middleware/isAuthUser";

const route = Router();

route.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const {id} = req.currentUser;

    const watchedMovies = await prisma.watched.findMany({
      where: {
        userId: id,
      },
      select: {
        movie: {
          select:{
            id: true,
            name: true,
            posterPath: true,
            postedAt: true,
            genre: true,
            isForPremium: true,
          }
        }
      },
      orderBy: {
        watchedAt: "desc",
      },
    });

    res.status(200).send(watchedMovies.map(movie=>movie.movie));

  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

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
