import { Request, Response } from "express";
import { connectToDb } from "../providers/db";
import { MongoClient } from "mongodb";
import UploadService from "../providers/uploadService";

interface IMovieInput {
  name: string;
  dataFile: string;
  thumbnailFile: string;
}

class MovieController extends UploadService {
  public async addMovieFile(req: Request, res: Response) {
    try {
      const client: MongoClient | undefined = await connectToDb();
      if (!client) throw new Error("Failed to connect to db");

      // Upload file
      const file: Express.Multer.File | undefined = req.file;

      if (!file) {
        return res.status(400).send({
          status: 0,
          message: "Invalid request",
        });
      }

      const result = await this.uploadFile(file);
      const fileUrl = await this.generateSignedUrl(result.Key, 24 * 3600);
      return res.status(200).send({ message: "SUCCESS", data: fileUrl });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public async addMovie(req: Request, res: Response) {
    try {
      const client: MongoClient | undefined = await connectToDb();
      if (!client) throw new Error("Failed to connect to db");

      const payload: IMovieInput = req.body;

      await client.db("movie-app").collection("movies").insertOne(payload);

      return res.status(200).send({
        message: "SUCCESS",
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}

export default MovieController;
