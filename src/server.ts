import express, { type Express } from "express";
import { config } from "./config/index.ts";
import cors from "cors"; 
import { sequelize } from "./config/db.ts"
import { initModels } from "./database/models/index.ts";

// import models from "./database/models/index.ts";

import { userRouter } from "./routes/user.routes.ts";
import songsRouter from "./routes/songs.routes.ts";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use(config.prefix, userRouter);
app.use(config.prefix, songsRouter)

const startServer = async () =>{
    try{
        await sequelize.query("SELECT NOW()");
        console.log("DB connected successfully");

        // models();
        initModels();

        app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
    }catch(error){
        console.error("failed to connect to DB ", error)
    }
}

startServer();