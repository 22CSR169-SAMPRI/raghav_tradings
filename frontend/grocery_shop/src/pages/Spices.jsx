import React, { useState, useEffect } from "react";
//import axios from "axios";
import CustomerLayout from "../components/CustomerLayout";
import { useCart } from "../context/CartContext";
import API from "../api";
const baseURL = API.defaults.baseURL; // Adjust the base URL if needed

const Spices = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    // Logic to add the product to the cart
    addToCart(product);
    console.log("Added to cart:", product);
    alert(`${product.name} has been added to your cart!`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products");
        const spices = response.data.filter(
          (product) => product.category === "spices"
        );
        setProducts(spices);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CustomerLayout>
    <div className="bg-gray-800 min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Spices</h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-700 p-4 rounded-lg shadow-sm relative"
            >
              {/* Product Image */}
              <div className="flex justify-center my-4">
                <img
                src={`${baseURL}${product.images[0]}`}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md"
               />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-green-400 font-medium mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-white font-bold mt-2">₹{product.price}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </CustomerLayout>
  );
};

export default Spices;