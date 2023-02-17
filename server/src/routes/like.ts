import { Router, Request, Response } from "express";
import prisma from "../../prisma";

const route = Router();

route.post("/like", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;
    const userId = req.currentUser.id;

    try {
      const deleteDislike = await prisma.dislike.delete({
        where: {
          userId_movieId: {
            userId,
            movieId,
          },
        },
      });
    } catch (e) {
      console.log("Dislike not found");
    }

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

route.post("/dislike", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;
    const userId = req.currentUser.id;

    try {
      const deleteLike = await prisma.like.delete({
        where: {
          userId_movieId: {
            userId,
            movieId,
          },
        },
      });
    } catch (e) {
      console.log("Like not found");
    }

    const newDislike = await prisma.dislike.create({
      data: {
        movieId,
        userId,
      },
    });

    res.status(201).send(newDislike);
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

route.delete("/dislike/:movieId", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const userId = req.currentUser.id;

    const deletedDislike = await prisma.dislike.delete({
      where: {
        userId_movieId: { userId, movieId },
      },
    });

    res.status(201).send(deletedDislike);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
