import app from "./app";
import connectMongoDB from "./mongo";
import { config } from "./config";

const PORT = config.PORT;
const host = config.HOST;

const startServer = async () => {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${host}:${PORT}`);
  });
};

startServer();
