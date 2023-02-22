import prisma from "../../../prisma";
import { Router, Request, Response } from "express";
const route = Router();

route.post("/", async(req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;
    const { movieId, text } = req.body;
    
    const newComment = await prisma.comments.create({data:{
      userId,
      movieId,
      text
    }});

    res.status(201).send({id: newComment.id, text: newComment.text, posted_at: newComment.posted_at});

  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
