import { Router, Request, Response } from "express";
import fileUpload from "express-fileupload";
import prisma from "../../../prisma";
import fs from "fs";
const route = Router();

route.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return res.status(400).send("No file uploaded.");
    }
    const userId = req.currentUser.id;
    const avatar = req.files.avatar as fileUpload.UploadedFile;

    const filePath = `./public/avatars/${userId}.png`;

    avatar.mv(filePath, (err) => {
      if (err) {
        console.error(`Error saving file: ${err}`);
        return res.status(500).send({ msg: "Error saving file." });
      }
    });

    console.log(`Received file: ${avatar.name}`);

    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatarPath: filePath.slice(8) },
    });

    res.status(200).send({ avatarPath: user.avatarPath });
  } catch (error) {
    console.error(`Error handling file upload: ${error}`);
    res.status(500).send({ msg: "Error handling file upload." });
  }
});

route.delete("/", async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;

    const filePath = `./public/avatars/${userId}.png`;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete file" });
      }
    });

    await prisma.user.update({
      where: { id: userId },
      data: { avatarPath: null },
    });

    res.status(204).send({ msg: "Avatar deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Server error" });
  }
});

export default route;
