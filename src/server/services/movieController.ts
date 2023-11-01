import { Request, Response } from "express";
import { connectToDb } from "../providers/db";
import { MongoClient } from "mongodb";
import UploadService from "../providers/uploadService";

class MovieController extends UploadService {
  public async addMovies(req: Request, res: Response) {
    try {
      const { name } = req.body;
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

      await this.uploadFile(file);
      await client.db("movie-app").collection("movies").insertOne({
        name,
      });
      return res.status(200).send("SUCCESS");
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}

export default MovieController;
