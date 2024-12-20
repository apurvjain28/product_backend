import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import router from "./routes/productsRouter.js";
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

// "/products"
app.use("/products", router);

try {
    await sequelize.authenticate();product
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

const port = process.env.PORT || 3001;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`App listening on ${port}.....`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();