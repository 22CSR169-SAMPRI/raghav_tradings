import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const saveCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = items;
    } else {
      cart = new Cart({ userId, items });
    }

    await cart.save();
    res.status(200).json({ message: "Cart saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save cart", error: error.message });
  }
};

export const clearCart = async (req, res) => {
    try {
      const { userId } = req.body;
  
      await Cart.findOneAndDelete({ userId });
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart", error: error.message });
    }
  };

  export const reduceStockAndClearCart = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Find the cart and populate product details
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      // Reduce stock for each product in the cart
      for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stock -= item.quantity;
          await product.save();
        }
      }
  
      // Clear the cart after reducing stock
      await Cart.findOneAndDelete({ userId });
  
      res.status(200).json({ message: "Stock updated and cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update stock and clear cart", error: error.message });
    }
  };

  export const getCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "name price stock", // Explicitly select the fields you need
      });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart", error: error.message });
    }
  };


export const saveOrderAndClearCart = async (req, res) => {
  try {
    const { userId, customerName, customerEmail, items, totalAmount } = req.body;

    // Save the order
    const order = new Order({
      customerId: userId,
      customerName,
      customerEmail,
      items,
      totalAmount,
    });
    await order.save();

    // Clear the cart
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Order saved and cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save order and clear cart", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 orders per page
    const skip = (page - 1) * limit;

    // Filter orders with totalAmount > 0
    const query = { totalAmount: { $gt: 0 } };

    // Fetch filtered orders with pagination
    const orders = await Order.find(query)
      .populate("customerId", "name email") // Populate customer details
      .sort({ createdAt: -1 }) // Sort by most recent orders
      .skip(skip)
      .limit(parseInt(limit))
      .lean(); // Use lean() for better performance

    // Count total filtered orders
    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

export const markOrderAsDispatched = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Remove the order from the database
    const result = await Order.findByIdAndDelete(orderId);

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order marked as dispatched" });
  } catch (error) {
    console.error("Error marking order as dispatched:", error.message);
    res.status(500).json({ message: "Failed to mark order as dispatched", error: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find and delete the order
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order dispatched and deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};