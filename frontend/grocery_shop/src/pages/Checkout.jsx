// filepath: d:\sam cse\consultancy_project\frontend\grocery_shop\src\pages\Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerLayout from "../components/CustomerLayout";
import API from "../api";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    // email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const { data } = await API.get(`/api/auth/shipping-details/${user.id}`);
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch shipping details:", error.message);
      }
    };

    fetchShippingDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveAddress = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      await API.post("/api/auth/shipping-details", {
        userId: user.id,
        shippingDetails: formData,
      });

      alert("Shipping details saved successfully!");
    } catch (error) {
      console.error("Failed to save shipping details:", error.message);
      alert("Failed to save shipping details.");
    }
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      navigate("/payment");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    //if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Street Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip Code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        {/* Breadcrumb Navigation */}
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

        <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>

        <div className="space-y-4">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Phone Number and Email */}
          {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
            <div>
              <label className="block text-sm mb-1">Phone Number*</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
            {/* <div>
              <label className="block text-sm mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div> */}
          {/* </div> */}

          {/* Street Address */}
          <div>
            <label className="block text-sm mb-1">Street Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* City, State, and Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Country */}
          <div>
            <label className="block text-sm mb-1">Country*</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          {/* Save to Address Book */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveAddress"
              className="mr-2"
              onChange={(e) => e.target.checked && handleSaveAddress()}
            />
            <label htmlFor="saveAddress" className="text-sm">Save to my address book</label>
          </div>

          {/* Proceed to Payment Button */}
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-medium mt-4"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Checkout;