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

    res.status(200).send(newWatchLater);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

router.delete("/:movieId", async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;
    const { movieId } = req.params;

    const newWatchLater = await prisma.watchLater.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    res.status(200).send(newWatchLater);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default router;
