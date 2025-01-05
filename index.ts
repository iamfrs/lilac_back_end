import * as express from "express";
import * as http from "http";
import { AppDataSource } from "./src/data-source";
import * as fileUpload from "express-fileupload";
import * as cors from "cors";
import { Request, Response } from "express";
import regionRouter from "./app/routes/region";
import countryRouter from "./app/routes/country";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(fileUpload());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    const server = http.createServer(app);

    // app.use("/", express.static("view"));
    app.get("/", async (req: Request, res: Response) => {
      res.send("ok from frs");
    });
    app.use("/img", express.static("public"));

    //─────────────────────────────── frs ───────────────────────────────

    app.use("/region", regionRouter);
    app.use("/country", countryRouter);

    //─────────────────────────────── Frs ───────────────────────────────

    app.get("/restart", (req: Request, res: Response) => {
      process.exit(1);
    });

    app.use(function (_req: Request, res: Response) {
      return res.redirect("/");
    });

    //─────────────────────────────── Frs ───────────────────────────────

    server.listen(5000, () => {
      console.log("listening on *:5000");
    });
  })
  .catch((err) => {
    console.log(" 500 Server issue", err);
  });
