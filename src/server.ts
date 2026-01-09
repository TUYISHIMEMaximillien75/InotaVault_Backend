import app from "./app";
import { config } from "./config";
import { sequelize } from "./config/db";
import { initModels } from "./database/models";

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
