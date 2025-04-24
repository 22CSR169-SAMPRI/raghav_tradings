import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CustomerLayout from "../components/CustomerLayout";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 50 : 0; // Example: Flat ₹50 shipping fee
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.05; // Example: 5% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  return (
    <CustomerLayout>
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-800 text-white">
        {/* Main content - Cart Items */}
        <div className="flex-grow">
          <div className="bg-gray-700 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-600">

              {/* Breadcrumbs */}
<div className="flex items-center text-sm mb-6 text-gray-400">
  <span
    className={`font-medium cursor-pointer hover:underline ${
      window.location.pathname === "/cart" ? "text-white" : "text-gray-400"
    }`}
    onClick={() => navigate("/cart")} // Navigate to Cart page
  >
    Cart
  </span>
  <span className="mx-2">›</span>
  <span
    className={`font-medium cursor-pointer hover:underline ${
      window.location.pathname === "/checkout" ? "text-white" : "text-gray-400"
    }`}
    onClick={() => navigate("/checkout")} // Navigate to Shipping page
  >
    Shipping
  </span>
  <span className="mx-2">›</span>
  <span
    className={`font-medium cursor-pointer hover:underline ${
      window.location.pathname === "/payment" ? "text-white" : "text-gray-400"
    }`}
    onClick={() => navigate("/payment")} // Navigate to Payment page
  >
    Payment
  </span>
</div>
            
            </div>

            <div className="p-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-400">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-start py-4 border-b border-gray-600 last:border-b-0"
                  >
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-gray-400">Product name</p>
                        <p className="font-medium">{item.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Quantity</p>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="bg-gray-600 text-white px-2 rounded"
                          >
                            -
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="bg-gray-600 text-white px-2 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Totals Section */}
          <div className="bg-gray-700 rounded-lg shadow">
            <div className="p-4 border-b border-gray-600">
              <h2 className="font-medium">Cart Totals</h2>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <p>Subtotal:</p>
                  <p>Shipping:</p>
                  <p>Tax (GST):</p>
                  <p className="font-medium">Total:</p>
                </div>
                <div className="col-span-1 text-right">
                  <p className="font-medium">₹{calculateSubtotal().toFixed(2)}</p>
                  <p className="font-medium">₹{calculateShipping().toFixed(2)}</p>
                  <p className="font-medium">₹{calculateTax().toFixed(2)}</p>
                  <p className="font-medium text-orange-500">₹{calculateTotal().toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with Checkout Information */}
        <div className="lg:w-96">
          {/* Summary Section */}
          <div className="bg-gray-700 rounded-lg shadow mb-4 p-4">
            <h2 className="font-medium mb-4">Summary</h2>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-400">Items in Cart</div>
              <div className="font-medium">{cartItems.length}</div>

              <div className="text-gray-400">Subtotal</div>
              <div className="font-medium">₹{calculateSubtotal().toFixed(2)}</div>

              <div className="text-gray-400">Total</div>
              <div className="font-medium text-orange-500">₹{calculateTotal().toFixed(2)}</div>
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="bg-gray-700 rounded-lg shadow mb-4 p-4">
            <h2 className="font-medium mb-4">Shipping Address</h2>
            <p className="text-gray-300">ABC street, Erode</p>
          </div>

          {/* Payment Method Section */}
          {/* <div className="bg-gray-700 rounded-lg shadow mb-4 p-4">
            <h2 className="font-medium mb-4">Payment Method</h2>
            <p className="text-gray-300">
              Pay on Delivery (Cash/Card). Cash on delivery (COD) available.
            </p>
          </div> */}

          {/* Checkout Button */}
          <div className="bg-gray-700 rounded-lg shadow mb-4 p-4">
            <button
              onClick={() => navigate("/checkout")} // Navigate to Checkout page
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Cart;