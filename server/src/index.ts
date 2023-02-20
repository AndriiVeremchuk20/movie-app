import exprpress, { Request, Response, Express } from "express";
import authRoute from "./routes/auth";
import adminRoute from "./routes/admin";
import mediaRoute from "./routes/media";
import likeRoute from "./routes/like";
import watchLaterRoute from "./routes/watchLater";
import avatarRoute from "./routes/avatar";
import adminMiddleware from "./middleware/admin";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import authMiddleware from "./middleware/auth";

const cors = require("cors");


dotenv.config();

const app: Express = exprpress();
const port = process.env.PORT;

app.use(cors());

app.use(
  fileupload({
    tempFileDir: "/tmp/",
    useTempFiles: true,
    createParentPath: true,
  })
);
app.use(exprpress.static("public"));
app.use(exprpress.json());
app.use(exprpress.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("All goods");
});

app.use((req: Request, res: Response, next) => {
  console.log(`${req.method}:${req.url}, Body: ${Object.keys(req.body)}`);
  next();
});

// app routes
app.use("/auth", authRoute); // auth route to registration, login or authentication users
app.use("/admin", adminMiddleware, adminRoute);
app.use("/media", mediaRoute);
app.use("/likes", authMiddleware, likeRoute);
app.use("/watchLater", authMiddleware, watchLaterRoute);
app.use("/avatar", authMiddleware, avatarRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
