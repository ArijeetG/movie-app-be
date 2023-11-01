import { connectToDb } from "./server/providers/db";
import createServer from "./server/server";

const PORT: number = Number(process.env.PORT) || 3002;

const startServer = async () => {
  const app = createServer();
  await connectToDb();
  app.listen(PORT, () => console.log(`server running at ${PORT} 🚀`));
};

startServer();
