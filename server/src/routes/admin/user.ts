import { Role } from "@prisma/client";
import { Router, Request, Response } from "express";
import prisma from "../../../prisma/index";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    const usersWithoudAdmins = users.filter((user) => user.role !== Role.ADMIN);
    res.status(200).send(usersWithoudAdmins);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

route.put("/:id", async (req: Request, res: Response) => {
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

route.delete("/:id", async (req: Request, res: Response) => {
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

export default route;
