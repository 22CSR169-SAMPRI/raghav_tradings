import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    discount: { type: String, required: true },
    weight: { type: String },
    originalPrice: { type: String, required: true },
    salePrice: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    category: { type: String, required: true }, // e.g., "spices", "fruits-vegetables", "coffee-tea"
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;