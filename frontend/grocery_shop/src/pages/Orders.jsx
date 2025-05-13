import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (page = 1) => {
  try {
    const { data } = await API.get(`/api/cart/orders?page=${page}&limit=10`);
    setOrders(data.orders); // Update orders state with filtered data
    setTotalPages(data.totalPages); // Update total pages based on filtered order count
    setCurrentPage(data.currentPage); // Update current page
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
  }
};

  const handleDispatched = async (orderId) => {
    try {
      await API.delete(`/api/cart/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Failed to mark order as dispatched:", error.message);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                  onClick={() => handleDispatched(order._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Dispatched
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
<div className="flex justify-center mt-6">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={`px-4 py-2 mx-1 rounded ${
        currentPage === index + 1 ? "bg-blue-500" : "bg-gray-700"
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>
      </div>
    </AdminLayout>
  );
};

export default Orders;