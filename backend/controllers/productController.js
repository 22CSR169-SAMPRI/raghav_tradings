import Product from "../models/Product.js";

// @desc Add a new product
// @route POST /api/products
// @access Admin
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, description, images } = req.body;

    const newProduct = new Product({
      name,
      category,
      price,
      stock,
      description,
      images,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

// @desc Get all products
// @route GET /api/products
// @access Public
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

// @desc Get products by category
// @route GET /api/products/:category
// @access Public
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};