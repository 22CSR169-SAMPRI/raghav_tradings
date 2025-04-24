import express from "express";
import { addProduct, getAllProducts, getProductsByCategory } from "../controllers/productController.js";
import Product from "../models/Product.js";
import sendEmail from "../utils/emailService.js";

const router = express.Router();

// Route to add a new product
router.post("/", addProduct);

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    // Check for low stock products
    const lowStockProducts = products.filter((product) => product.stock < 5);
    if (lowStockProducts.length > 0) {
      const productNames = lowStockProducts.map((p) => p.name).join(", ");
      const emailText = `The following products have low stock (less than 5): ${productNames}`;
      await sendEmail("raghavtradings6789@gmail.com", "Low Stock Alert", emailText);
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get products by category
router.get("/:category", getProductsByCategory);

// Route to delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});

// Route to update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
});

export default router;