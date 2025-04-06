import express from "express";
import upload from "../middleware/UploadMiddleware.js";

const router = express.Router();

// Route to upload an image
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
});

export default router;