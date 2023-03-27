import { Router, Request, Response } from "express";
import prisma from "../../../prisma/index";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
    try {
      const watched = await prisma.watched.findMany({
        where: {
          watchedAt: {
            gte: new Date("2023-01-01T00:00:00.000Z"),
            lt: new Date("2024-01-01T00:00:00.000Z"),
          },
        },
        orderBy: {
          watchedAt: "asc",
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
        orderBy: {
          registredAt: "asc",
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
  
      const mostActiveUsers = await prisma.user.findMany({
        where:{
          NOT:{
            firstName: "Admin"
          },
        },
        select: {
          firstName: true,
          lastName: true,
          Watched: true,
          likes: true,
          watchLater: true,
          comments: true,
        },
        orderBy: [
            {
                Watched: {
                  _count: 'desc'
                }
              },
              {
                likes: {
                  _count: 'desc'
                }
              },
              {
                watchLater: {
                    _count: "desc"
                }
              },
              {
                comments: {
                  _count: "desc"
                }
              }
        ],
        take: 5,
      });
  
      const activedUsers = mostActiveUsers.map((user) => ({
        ...user,
        Watched: user.Watched.length,
        likes: user.likes.length,
        watchLater: user.watchLater.length,
        comments: user.comments.length,
      }));
  

      res.status(200).send({ watched: watchedStats, registrations: regStats, mostActiveUsers: activedUsers });
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: "Server error" });
    }
  });

  export default route;
