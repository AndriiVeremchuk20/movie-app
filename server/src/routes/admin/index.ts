import { Role } from "@prisma/client";
import { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import prisma from "../../../prisma/index";
import checkFilesFormat from "../../utils/checkFilesFormat";
import { v4 as uuidv4 } from "uuid";
import { getMovieGenreByName } from "../../utils/getMovieGenreByName";

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

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isPremium: false,
      },
    });

    res.status(201).send({ msg: "Done", id: updateUser.id });
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

// route.delete("/movie/:id",async (req: Request, res: Response) => {

// });

route.put("/movie/:id", async (req: Request, res: Response) => {
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

route.get("/stats", async (req: Request, res: Response) => {
  try {
    const watched = await prisma.watched.findMany({
      where: {
        watchedAt: {
          gte: new Date("2023-01-01T00:00:00.000Z"),
          lt: new Date("2024-01-01T00:00:00.000Z"),
        },
      },
      orderBy:{
        watchedAt: "desc"
      },
      select: {
        watchedAt: true,
      },
    });

    const watchedStatsMap = new Map<string, number>();

    watched.forEach((date) => {
      const month = date.watchedAt.toLocaleString("default", { month: "long" });
      const count = watchedStatsMap.get(month);
      if (count) {
        watchedStatsMap.set(month, count + 1);
      } else {
        watchedStatsMap.set(month, 1);
      }
    });

    const watchedStats = Array.from(watchedStatsMap.entries());

    const regUsers = await prisma.user.findMany({
      where: {
        registredAt: {
          gte: new Date("2023-01-01T00:00:00.000Z"),
          lt: new Date("2024-01-01T00:00:00.000Z"),
        },
      },
      orderBy:{
        registredAt: "desc"
      },
      select: {
        registredAt: true,
      },
    });

    const regStatsMap = new Map<string, number>();

    regUsers.forEach((user) => {
      const month = user.registredAt.toLocaleString("default", {
        month: "long",
      });
      const count = regStatsMap.get(month);
      if (count) {
        regStatsMap.set(month, count + 1);
      } else {
        regStatsMap.set(month, 1);
      }
    });

    const regStats = Array.from(regStatsMap.entries());

    res.status(200).send({ watched: watchedStats, registrations: regStats });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
