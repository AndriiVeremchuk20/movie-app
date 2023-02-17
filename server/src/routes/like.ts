import { Router, Request, Response } from "express";
import prisma from "../../prisma";

const route = Router();

route.post("/like", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;
    const userId = req.currentUser.id;

    const newLike = await prisma.like.create({
      data: {
        movieId,
        userId,
      },
    });

    res.status(201).send(newLike);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.delete("/like/:movieId", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const userId = req.currentUser.id;

    const deletedLike = await prisma.like.delete({
      where: {
        userId_movieId: { userId, movieId },
      },
    });

    res.status(201).send(deletedLike);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
