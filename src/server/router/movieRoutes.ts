import express, { Request, Response } from "express";
import MovieController from "../services/movieController";
import upload from "../providers/multer";

const router = express.Router();
const controller = new MovieController();

router.post("/movie", upload.single("file"), (req: Request, res: Response) =>
  controller.addMovies(req, res)
);

export default router;
