import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerLayout from "../components/CustomerLayout";
import { useCart } from "../context/CartContext";
import { X, Minus, Plus } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal < 500 ? 50 : 0; // ₹50 shipping fee for orders less than ₹500
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.05; // Example: 5% GST
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax();
    return subtotal + shipping + tax;
  };

  const freeShipping = calculateSubtotal() >= 500; // Free shipping for orders ₹500 or more

  useEffect(() => {
    // Save totals in localStorage
    localStorage.setItem("subtotal", calculateSubtotal().toFixed(2));
    localStorage.setItem("shipping", calculateShipping().toFixed(2));
    localStorage.setItem("tax", calculateTax().toFixed(2));
    localStorage.setItem("total", calculateTotal().toFixed(2));
  }, [cartItems]);

  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto p-4 bg-gray-800 text-white font-sans">
        <h1 className="text-2xl font-bold mb-6">Your Cart ({cartItems.length} items)</h1>

        {/* Flexbox Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-grow">
            <div className="border-b border-gray-600 pb-2 mb-4 grid grid-cols-12 gap-4">
              <div className="col-span-6 text-sm font-medium text-left">Item</div>
              <div className="col-span-2 text-sm font-medium text-center">Price</div>
              <div className="col-span-2 text-sm font-medium text-center">Quantity</div>
              <div className="col-span-2 text-sm font-medium text-right">Total</div>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="border border-gray-600 rounded-lg p-4 mb-4 grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-6 flex flex-col text-left">
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>

                  <div className="col-span-2 text-center">
                    ₹{(item.price || 0).toFixed(2)}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-500 rounded">
                      <button
                        className="p-1 hover:bg-gray-700"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        className="p-1 hover:bg-gray-700"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex justify-between items-center">
                    <span className="text-right w-full">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal Section */}
          <div className="w-full lg:w-1/3 bg-gray-700 p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax:</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{calculateShipping().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Grand total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>

              {freeShipping && (
                <div className="bg-green-600 p-2 rounded flex justify-between items-center">
                  <span className="text-sm text-white">
                    Congrats, you're eligible for <strong>Free Shipping</strong>
                  </span>
                  <span>🎁</span>
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Cart;