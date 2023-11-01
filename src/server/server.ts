import express, { Request, Response } from "express";
import movieRouter from "./router/movieRoutes";
import bodyParser from "body-parser";

const createServer = (): express.Application => {
  const app = express();

  app.get("/health-check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use(bodyParser.json());
  app.use(movieRouter);
  return app;
};

export default createServer;
