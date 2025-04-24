import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CustomerLayout from "../components/CustomerLayout";

const Checkout = () => {
  const { cartItems } = useCart(); // Access cart items from CartContext
  const navigate = useNavigate(); // Initialize useNavigate
  const [shippingMethod, setShippingMethod] = useState("free");
  const [discountCode, setDiscountCode] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return 50; // Flat ₹50 shipping charge
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.05; // Example: 5% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip Code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form submitted successfully!");
      // Proceed to payment or next step
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <CustomerLayout>
      <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-800 min-h-screen text-white">
        {/* Left Column - Shipping Information */}
        <div className="flex-1 bg-gray-700 p-6 rounded-lg shadow-sm">
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

          {/* Shipping Address */}
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Phone number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">State*</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Zip Code*</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
            </div>
          </div>
        </div>

        {/* Right Column - Cart Summary */}
        <div className="md:w-80 bg-gray-700 p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {/* Cart Items */}
          <div className="border-b pb-4 mb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex mb-4">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mb-4">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping</span>
              <span className="font-medium">₹{calculateShipping().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax (GST)</span>
              <span className="font-medium">₹{calculateTax().toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between py-2 border-t mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-lg">₹{calculateTotal().toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-medium"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Checkout;