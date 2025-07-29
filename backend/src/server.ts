import app from "./app";
import envConfig from "./config/dotenv";
import connectToDb, { getDbContext } from "./db/lowdb";

const PORT: number = envConfig.PORT;

const startServer = async () => {
  try {
    await connectToDb();

    const dbInstance = getDbContext();

    await dbInstance?.read();

    process.on("SIGINT", () => {
      console.log("Server was interrupt with Ctrl + C, Server shutting down");
      process.exit();
    });

    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  } catch (error) {
    console.error("failed to start server", error);
    process.exit(1);
  }
};

startServer();
