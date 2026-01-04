require("dotenv").config();

const prefix = (() => {
  const env = process.env.NODE_ENV || "development";
  switch (env) {
    case "development":
      return "DEV";
    case "production":
      return "PROD";
    case "testing":
      return "TEST";
    default:
      return "DEV";
  }
})();

module.exports = {
  development: {
    username: process.env[`DB_${prefix}_USERNAME`],
    password: process.env[`DB_${prefix}_PASSWORD`],
    database: process.env[`DB_${prefix}_NAME`],
    host: process.env[`DB_${prefix}_HOST`] || "localhost",
    port: Number(process.env[`DB_${prefix}_PORT`] || 5432),
    dialect: "postgres"
  },
};
