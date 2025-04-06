import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import path from "path";
import fs from "fs";

dotenv.config();
connectDB();

const app = express();

const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use(cors());

// Auth routes
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Product routes
app.use("/api/products", productRoutes);
app.use("/api/upload", UploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));