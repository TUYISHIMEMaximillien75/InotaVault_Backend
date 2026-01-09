import express, { Express } from "express";
import cors from "cors";
import songsRouter from "./routes/songs.routes";
import { userRouter } from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { config } from "./config";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(config.prefix, songsRouter);
app.use(config.prefix, userRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
