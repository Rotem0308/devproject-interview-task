import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors, { CorsOptions } from "cors";
import envConfig from "./config/dotenv";
import helmet from "helmet";
import taskRouter from "./routes/task.route";
const app: Application = express();

const corsConfiguration: CorsOptions = {
  origin: [envConfig.ALLOWED_CORS_ORIGIN],
  methods: ["GET", "DELETE", "POST", "PUT"],
};

app.use(cors(corsConfiguration));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/items", taskRouter);

//catch-All Route
app.use((_: Request, res: Response) => {
  res.status(404).json({ message: "Requested Route Was Not Found" });
});

const errorHandler: ErrorRequestHandler = (
  err: any,
  _: Request,
  res: Response
) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

//global Error Handleriko
app.use(errorHandler);

export default app;
