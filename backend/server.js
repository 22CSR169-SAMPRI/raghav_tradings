import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";
import fs from "fs";
import cartRoutes from "./routes/cartRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();
connectDB();

const app = express();

const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());

// Allow multiple origins for CORS
const allowedOrigins = [
  "https://raghav-tradings.vercel.app", // Frontend hosted URL
  "http://localhost:3000", // Local development URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Auth routes
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Product routes
app.use("/api/products", productRoutes);
app.use("/api/upload", UploadRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));