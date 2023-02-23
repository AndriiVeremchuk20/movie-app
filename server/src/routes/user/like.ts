import { Router, Request, Response } from "express";
import prisma from "../../../prisma";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;

    const likedMovies = await prisma.like.findMany({
      where: {
        userId,
      },
      select:{
        movie: {
          select: {
            id: true,
            name: true,
            postedAt: true,
            posterPath: true,
          }
        }
      }
    }).then(movies => movies.map(movie => movie.movie));

    res.status(200).send(likedMovies);

  } catch (e) {
    console.log(e);
    res.status(500).send({msg: "Server error"});
  }
});

route.post("/", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;
    const userId = req.currentUser.id;

    const newLike = await prisma.like.create({
      data: {
        movieId,
        userId,
      },
    });

    res.status(201).send({ movieId: newLike.movieId });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.delete("/:movieId", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const userId = req.currentUser.id;

    const deletedLike = await prisma.like.delete({
      where: {
        userId_movieId: { userId, movieId },
      },
    });

    res.status(201).send({ movieId: deletedLike.movieId });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
