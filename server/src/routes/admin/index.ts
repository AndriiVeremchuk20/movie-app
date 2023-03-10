import { Role } from "@prisma/client";
import { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import prisma from "../../../prisma/index";
import checkFilesFormat from "../../utils/checkFilesFormat";
import { v4 as uuidv4 } from "uuid";

const route = Router();

route.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    const usersWithoudAdmins = users.filter((user) => user.role !== Role.ADMIN);
    res.status(200).send(usersWithoudAdmins);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updaeUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isPremium: false,
      },
    });

    res.status(203).send({ msg: "Done", id: updaeUser.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});

route.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(203).send({ msg: "Deleted success", id: deletedUser.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});

route.post("/movie", async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return res.status(403).send({ msg: "No file uploaded" });
    }

    const { name, description, isPremium, postedAt } = req.body;
    const movie = req.files.movie as UploadedFile;
    const poster = req.files.poster as UploadedFile;

    const correctMovieFormat = checkFilesFormat(movie.name, ["mp4", "mkv"]);
    const correctPosterFormat = checkFilesFormat(poster.name, [
      "jpg",
      "jpeg",
      "png",
    ]);

    if (!correctMovieFormat || !correctPosterFormat) {
      return res.status(403).send({ msg: "uncorrect files format" });
    }

    const mediaId = uuidv4();

    const moviePath = `./public/movie/${name}/video/${mediaId}.mp4`;
    const posterPath = `./public/movie/${name}/poster/${mediaId}.png`;

    console.log("start writing files");
    await movie.mv(moviePath);
    await poster.mv(posterPath);
    console.log("end writing files");

    const newMovie = await prisma.movie.create({
      data: {
        name,
        description,
        isForPremium: isPremium === "true",
        posterPath: posterPath.slice(8),
        moviePath: moviePath.slice(8),
        postedAt: new Date(postedAt),
      },
    });

    res.status(201).send(newMovie);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});


export default route;
