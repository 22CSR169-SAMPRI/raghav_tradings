import express from "express";
import { getAllProducts, getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts); // Fetch all products
router.get("/:category", getProductsByCategory); // Fetch products by category

export default router;