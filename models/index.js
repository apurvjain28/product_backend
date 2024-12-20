import {Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
  host: 'localhost',
  dialect: "mysql",
});

export { Sequelize, sequelize}