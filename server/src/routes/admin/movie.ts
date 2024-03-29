import { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import prisma from "../../../prisma/index";
import checkFilesFormat from "../../utils/checkFilesFormat";
import { v4 as uuidv4 } from "uuid";
import { getMovieGenreByName } from "../../utils/getMovieGenreByName";
import { rmdir } from "fs";
const route = Router();

route.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return res.status(403).send({ msg: "No file uploaded" });
    }

    const { name, description, isPremium, postedAt, genre } = req.body;
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
        genre: getMovieGenreByName(genre),
      },
    });

    res.status(201).send(newMovie);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMovie = await prisma.movie.delete({
      where: {
        id,
      },
    });

    const path = deletedMovie.moviePath.split("/");

    const mediaFolder = `./public/${path[1]}/${path[2]}`;

    rmdir(mediaFolder, { recursive: true }, (err) => {
      if (err) throw err;
      console.log("Movie directory deleted");
    });

    res.status(203).send(deletedMovie);
  } catch (e) {
    console.log(e);
    res.status(203).send("Server error");
  }
});

route.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    console.log(id);
    const { name, description, isForPremium, postedAt, genre } = req.body;

    console.log(name, description, isForPremium, postedAt, genre);

    const updateMovie = await prisma.movie.update({
      where: {
        id,
      },
      data: {
        name: name,
        description: description,
        isForPremium: isForPremium,
        postedAt: new Date(postedAt),
        genre: getMovieGenreByName(genre),
      },
    });

    res.status(201).send({ updateMovie });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
