import prisma from "../../prisma";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;
    const { movieId } = req.body;

    const newWatchLater = await prisma.watchLater.create({
      data: {
        userId,
        movieId,
      },
    });

    res.status(200).send({ movieId: newWatchLater.movieId });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

router.delete("/:movieId", async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;
    const { movieId } = req.params;

    const deletedWatchLater = await prisma.watchLater.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    res.status(200).send({ movieId: deletedWatchLater.movieId });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser;

    const movies = await prisma.watchLater.findMany({
      where: { userId: id },
      select: {
        movie: {
          select: { id: true, name: true, posterPath: true, postedAt: true },
        },
      },
    })

    res.status(200).send(movies.map(movie => movie.movie).reverse());
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default router;
