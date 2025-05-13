import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import { CreditCard } from "lucide-react";
//import axios from "axios";
import API from "../api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to "card"

  // Calculate the total dynamically based on cart data
  const calculateTotal = () => {
    const subtotal = parseFloat(localStorage.getItem("subtotal")) || 0;
    const shipping = parseFloat(localStorage.getItem("shipping")) || 50;
    const tax = parseFloat(localStorage.getItem("tax")) || 0;
    return subtotal + shipping + tax;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (paymentMethod === "cod") {
      // Handle Cash on Delivery
      //alert("Order placed successfully with Cash on Delivery!");
      navigate("/thank-you");
      return;
    }

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment intent on the server
      const { data } = await API.post("/api/payment/create-payment-intent", {
        amount: calculateTotal() * 100, // Convert to smallest currency unit (e.g., cents)
      });

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        alert("Card details are missing. Please enter your card information.");
        return;
      }

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: localStorage.getItem("customerName"),
            email: localStorage.getItem("customerEmail"),
          },
        },
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        navigate("/thank-you"); // Redirect to a thank-you page
      }
    } catch (err) {
      console.error("Error processing payment:", err.message);
      alert("An error occurred while processing your payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
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

      {/* Payment Section */}
      <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Payment</h2>
        <div className="bg-gray-900 p-4 rounded-lg text-gray-300">
          {/* Payment method selection */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Select Payment Method</label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="card" className="text-sm">Credit/Debit Card</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="cod" className="text-sm">Cash on Delivery</label>
            </div>
          </div>

          {/* Card form */}
          {paymentMethod === "card" && (
            <form onSubmit={handlePayment}>
              <div className="mb-6">
                <label className="block mb-2 text-sm">Card Details</label>
                <CardElement
                  className="p-3 border border-gray-600 rounded bg-gray-800 text-white"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#ffffff",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#fa755a",
                        iconColor: "#fa755a",
                      },
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-medium text-lg"
              >
                {isProcessing ? "Processing..." : `Pay ₹${calculateTotal().toFixed(2)}`}
              </button>
            </form>
          )}

          {/* Cash on Delivery */}
          {paymentMethod === "cod" && (
            <button
              onClick={handlePayment}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-medium text-lg"
            >
              Place Order (Cash on Delivery)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentPage;