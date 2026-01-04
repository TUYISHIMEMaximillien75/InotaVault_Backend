import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Detect prefix (DEV / PROD / TEST)
const PrefixConfig = () => {
  const env = process.env["NODE_ENV"] || "development";

  switch (env) {
    case "development": return "DEV";
    case "production": return "PROD";
    case "testing": return "TEST";
    default: return "DEV";
  }
};

const prefix = PrefixConfig();

export const sequelize = new Sequelize(
  process.env[`DB_${prefix}_NAME`] as string,
  process.env[`DB_${prefix}_USERNAME`] as string,
  process.env[`DB_${prefix}_PASSWORD`] as string,
  {
    host: process.env[`DB_${prefix}_HOST`] || "localhost",
    port: Number(process.env[`DB_${prefix}_PORT`] || 5432),
    dialect: "postgres",
    logging: false,
  }
);
export default sequelize;