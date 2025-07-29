import express, { Application, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import envConfig from "./config/dotenv";
import helmet from "helmet";

const app: Application = express();

const corsConfiguration: CorsOptions = {
  origin: [envConfig.ALLOWED_CORS_ORIGIN],
};

app.use(cors(corsConfiguration));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Requested Route Was Not Found" });
});

app.use((err: any, _: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
