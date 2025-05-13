import express from "express";
import {
  getSalesSummary,
  getPopularProducts,
  getTopProductSales,
  getSalesThisYear,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/sales-summary", getSalesSummary);
router.get("/popular-products", getPopularProducts);
router.get("/top-product-sales", getTopProductSales);
router.get("/sales-this-year", getSalesThisYear);

export default router;