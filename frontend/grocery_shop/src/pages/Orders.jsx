import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/cart/orders");
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  // Handle order dispatch
  const handleDispatch = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      console.log("Order dispatched and deleted successfully");
    } catch (error) {
      console.error("Failed to dispatch order:", error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-800 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
                <p>Customer: {order.customerName}</p>
                <p>Email: {order.customerEmail}</p>
                <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
                <h3 className="font-semibold mt-4">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.productId}>
                      {item.name} - ₹{item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDispatch(order._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Dispatched
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;