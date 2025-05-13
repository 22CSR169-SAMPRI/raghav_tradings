import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../api";

export default function ThankYou() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const saveOrderAndClearCart = async () => {
      try {
        const totalAmount = cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        // Send order details to the backend
        await API.post("/api/cart/save-order-and-clear", {
          userId: user.id,
          customerName: user.name,
          customerEmail: user.email,
          items: cartItems,
          totalAmount,
        });

        clearCart(); // Clear the cart in the frontend
        console.log("Order saved and cart cleared successfully");
      } catch (error) {
        console.error("Failed to save order and clear cart:", error.message);
      }
    };

    saveOrderAndClearCart();
  }, [cartItems, clearCart]);

  const handleContinueShopping = () => {
    navigate("/customer-dashboard"); // Redirect to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="bg-gray-700 rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full p-3 w-16 h-16 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Order Confirmed!</h2>
        <p className="text-gray-300 mb-6">
          Thank you for your purchase. We hope to see you again soon!
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleContinueShopping}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}