import app from "./app.ts";
import { config } from "./config/index.ts";
import { sequelize } from "./config/db.ts";
import { initModels } from "./database/models/index.ts";

const startServer = async () => {
  try {
    await sequelize.query("SELECT NOW()");
    console.log("DB connected successfully");

    initModels();

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
  }
};

startServer();
