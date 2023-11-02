import express, { Request, Response } from "express";
import MovieController from "../services/movieController";
import upload from "../providers/multer";

const router = express.Router();
const controller = new MovieController();

router.post(
  "/movie-file",
  upload.single("file"),
  (req: Request, res: Response) => controller.addMovieFile(req, res)
);

router.post("/movie", (req: Request, res: Response) =>
  controller.addMovie(req, res)
);

export default router;
