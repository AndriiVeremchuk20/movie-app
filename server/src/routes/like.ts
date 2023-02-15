import { Router, Request, Response } from "express";
import prisma from "../../prisma";

const route = Router();

route.post("/like", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;
    const userId = req.currentUser.id;

    try {
      const checkLike = await prisma.dislike.findFirstOrThrow({
        where: {
          userId,
          movieId,
        },
      });
    } catch (e) {
      console.log(e);
      
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

route.delete("/like/:movieid", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;
    const userId = req.currentUser.id;

    console.log(movieId, userId);

    // const newLike = await prisma.like.create({
    //   data: {
    //     movieId,
    //     userId,
    //   },
    // });

    res.status(201).send("newLike");
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.delete("/dislike/:movieId", async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const userId = req.currentUser.id;
    console.log(movieId, userId);

    // const newDislike = await prisma.dislike.delete({
    //   where: {
    //     movieId: movieId,
    //     userId: userId,
    //   }
    // });

    res.status(201).send("newDislike");
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
