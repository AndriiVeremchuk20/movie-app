import { Router, Request, Response } from "express";
import prisma from "../../prisma";

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
          dislikes: true,
        }
      });

      res.status(200).send(movie);
    } catch (e) {
      res.status(404).send({ msg: `Movie not found` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
