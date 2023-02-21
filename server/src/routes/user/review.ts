import prisma from "../../../prisma";
import { Router, Request, Response } from "express";
const route = Router();

route.post("/", async(req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;
    const { movieId, text } = req.body;
    
    const newComment = await prisma.review.create({data:{
      userId,
      movieId,
      text
    }});

    console.log(newComment);

    res.status(201).send(newComment);

  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
