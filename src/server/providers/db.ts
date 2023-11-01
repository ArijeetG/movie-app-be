import * as mongo from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

export const collections: { movies?: mongo.Collection } = {};

let conn: mongo.MongoClient;

export async function connectToDb() {
  const client: mongo.MongoClient = new mongo.MongoClient(
    String(process.env.DB_CONN_STRING),
    {
      serverApi: {
        version: mongo.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    }
  );

  if (conn) {
    return conn;
  } else {
    conn = await client.connect();
    console.log("Connected to db ✔️");
  }
}
