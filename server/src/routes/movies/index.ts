import { Router, Request, Response } from "express";
import prisma from "../../../prisma";
import isPremiumMiddleware from "../../middleware/isPremium";
import { getMovieGenreByName } from "../../utils/getMovieGenreByName";
import watchedRoute from "./watched";

const route = Router();
const LIMIT = 12;

route.use("/watched", watchedRoute);

route.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * LIMIT;
    const search = req.query.search || "";
    const filter = req.query.filter as string;
    const sort = req.query.sort as string;

    const numOfMovies = await prisma.movie.count({
      where: {
        name: {
          contains: `${search}`,
          mode: "insensitive",
        },
        genre: getMovieGenreByName(filter),
      },
    });
    let movies = await prisma.movie.findMany({
      where: {
        name: {
          contains: `${search}`,
          mode: "insensitive",
        },
        genre: getMovieGenreByName(filter),
      },
      select: {
        name: true,
        postedAt: true,
        posterPath: true,
        id: true,
        isForPremium: true,
        genre: true,
        likes: true,  
      },
      orderBy: [
        { postedAt: `${sort === "DATE_UP" ? "asc" : "desc"}` },
        ],
      take: LIMIT,
      skip: skip,
    });


    //let Movies = movies.map((movie)=>({...movie, likes: movie.likes.length}))
    
    if (sort === "NAME_DOWN") {
      movies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "NAME_UP") {
      movies.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "LIKES") {
      movies.sort((a,b)=>b.likes.length - a.likes.length);
    }



    res.status(200).send({
      movies: movies.map((movie)=>({...movie, likes: movie.likes.length})),
      pages: Math.ceil(numOfMovies / LIMIT),
      page: page,
    });
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
      select: {
        id: true,
        name: true,
        postedAt: true,
        posterPath: true,
        isForPremium: true,
      },
    });

    res.status(200).send(results);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.get("/:id", isPremiumMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {isPremiumUser} = req;
    
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
          isForPremium: true,
          genre: true,
          watched: true,
          comments: {
            orderBy: {
              posted_at: "desc",
            },
            select: {
              id: true,
              text: true,
              posted_at: true,
              User: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatarPath: true,
                },
              },
            },
          },
        },
      });

       if (movie.isForPremium && !isPremiumUser) {
         movie.moviePath = "";
       }

      const recommendations = await prisma.$queryRawUnsafe(
        `SELECT id, name, "posterPath", "postedAt", "isForPremium"  FROM "Movie" WHERE id != '${id}' ORDER BY RANDOM() LIMIT 7;`
      );

      res.status(200).send({
        ...movie,
        watched: movie.watched.length,
        likes: movie.likes.length,
        recommendations: recommendations,        
      });
    } catch (e) {
      res.status(404).send({ msg: `Movie not found` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
