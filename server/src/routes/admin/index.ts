import { Router, Request, Response } from "express";
import statsRoute from "./stats";
import userRoute from "./user";
import movieRoute from "./movie";

const route = Router();

route.use("/stats", statsRoute);
route.use("/users", userRoute);
route.use("/movie", movieRoute);

export default route;
