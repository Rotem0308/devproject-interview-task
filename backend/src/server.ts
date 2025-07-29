import app from "./app";
import envConfig from "./config/dotenv";

const PORT: number = envConfig.PORT;

process.on("SIGINT", () => {
  console.log("Server was interrupt with Ctrl + C, Server shutting down");
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
