import express from "express";
import { addProduct, getAllProducts, getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

// Route to add a new product
router.post("/", addProduct);

// Route to get all products
router.get("/", getAllProducts);

// Route to get products by category
router.get("/:category", getProductsByCategory);

export default router;