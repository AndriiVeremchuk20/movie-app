import { Router, Request, Response } from "express";
import prisma from "../../prisma";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
    try {
      const movies = await prisma.movie.findMany({});
      res.status(200).send(movies);
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
          where: { id: parseInt(id) },
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
