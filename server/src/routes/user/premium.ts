import { Router, Request, Response } from "express";
import prisma from "../../../prisma";
import authMiddleware from "../../middleware/auth";

const router = Router();

router.put("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser;
    await prisma.user.update({
      where: { id: id },
      data: { isPremium: true },
    });

    
    res.status(200).send({ msg: "Done" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      where: { isForPremium: true },
      select: {
        id: true,
        posterPath: true,
        name: true,
        postedAt: true,
        isForPremium: true,
      },
      take: 6,
    });
    res.status(200).send(movies);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default router;
