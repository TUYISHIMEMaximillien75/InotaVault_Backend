import express from "express";
import type { Express } from "express";
import cors from "cors";
import songsRouter from "./routes/songs.routes.ts";
import { userRouter } from "./routes/user.routes.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.ts";
import { config } from "./config/index.ts";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(config.prefix, songsRouter);
app.use(config.prefix, userRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
