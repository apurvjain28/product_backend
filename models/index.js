import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

export { Sequelize, sequelize };
