import express from "express";
import {getProduct, getMostViewedProducts} from "../controllers/productsController.js"

const router = express.Router();

router.get("/:id", getProduct)
router.get("/", getMostViewedProducts)

export default router;