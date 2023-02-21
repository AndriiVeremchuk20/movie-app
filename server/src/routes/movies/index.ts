import { Router, Request, Response } from "express";
import commentsRoute from "./review";
import prisma from "../../../prisma";
import authMiddleware from "../../middleware/auth";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      select: { name: true, postedAt: true, posterPath: true, id: true },
      orderBy: [{ postedAt: "desc" }],
    });
    res.status(200).send(movies);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.get("/search", async (req: Request, res: Response) => {
  try {
    const { search_query } = req.query;
    console.log(search_query);

    const results = await prisma.movie.findMany({
      where: {
        name: {
          contains: `${search_query ?? ""}`,
          mode: "insensitive",
        },
      },
      select: { name: true, postedAt: true, posterPath: true, id: true },
    });

    res.status(200).send(results);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    try {
      const movie = await prisma.movie.findFirstOrThrow({
        where: { id: id },
        select: {
          id: true,
          name: true,
          description: true,
          postedAt: true,
          posterPath: true,
          moviePath: true,
          likes: true,
        },
      });

      const recommendations = await prisma.$queryRawUnsafe(
        `SELECT id, name, "posterPath", "postedAt"  FROM "Movie" WHERE id != '${id}' ORDER BY RANDOM() LIMIT 7;`
      );
      
      res.status(200).send({ ...movie, likes: movie.likes.length, recommendations: recommendations });
    } catch (e) {
      res.status(404).send({ msg: `Movie not found` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.use("/comments", authMiddleware, commentsRoute);

export default route;
