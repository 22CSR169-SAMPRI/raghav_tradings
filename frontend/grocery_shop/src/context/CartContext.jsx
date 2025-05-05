import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from the database on initialization
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const { data } = await API.get(`/cart/${user.id}`);
      const validatedItems = data.items.map((item) => ({
        ...item,
        price: item.productId?.price || 0, // Ensure price is valid
        name: item.productId?.name || "Unknown Product", // Ensure name is valid
      }));
      setCartItems(validatedItems);
    } catch (error) {
      console.error("Failed to fetch cart:", error.message);
    }
  };

  const saveCartToDatabase = async (items) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      await API.post("/cart/save", { userId: user.id, items });
      fetchCart(); // Re-fetch the cart after saving to ensure updated data
    } catch (error) {
      console.error("Failed to save cart:", error.message);
    }
  };

  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.productId === product._id);
    const updatedItems = existingItem
      ? cartItems.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { productId: product._id, quantity: 1 }];

    setCartItems(updatedItems);
    saveCartToDatabase(updatedItems);
  };

  const removeFromCart = async (productId) => {
    const updatedItems = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedItems);
    saveCartToDatabase(updatedItems);
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId); // Remove item if quantity is 0 or less
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    setCartItems(updatedItems);
    saveCartToDatabase(updatedItems);
  };

  const clearCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      await API.post("/cart/clear", { userId: user.id });
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);