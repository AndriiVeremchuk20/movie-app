import { Router, Request, Response } from "express";
const route = Router();

route.post("/", (req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;
    const { movieId } = req.body;


    res.json({m: "done"})
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
