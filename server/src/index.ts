import express, { Request, Response, Express } from "express";
import userRoute from "./routes/user";
import adminRoute from "./routes/admin";
import mediaRoute from "./routes/movies";
import adminMiddleware from "./middleware/admin";
import dotenv from "dotenv";
import fileupload from "express-fileupload";

const cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.use(
  fileupload({
    tempFileDir: "/tmp/",
    useTempFiles: true,
    createParentPath: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("All goods");
});

app.use((req: Request, res: Response, next) => {
  console.log(`${req.method}:${req.url}, Body: ${Object.keys(req.body)}`);
  next();
});

// app routes
app.use("/user", userRoute); // auth route to registration, login or authentication users
app.use("/admin", adminMiddleware, adminRoute);
app.use("/media", mediaRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
