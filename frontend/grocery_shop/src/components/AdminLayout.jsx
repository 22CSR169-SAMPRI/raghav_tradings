import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  return (
    <div className="min-h-screen flex bg-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Raghav Tradings (Admin)</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className={`w-full text-left p-2 rounded ${
                  location.pathname === "/admin-dashboard"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/add-items")}
                className={`w-full text-left p-2 rounded ${
                  location.pathname === "/add-items"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                Add Items
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/manage-products")}
                className={`w-full text-left p-2 rounded ${
                  location.pathname === "/manage-products"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                Manage Products
              </button>
            </li>
            <li>
  <button
    onClick={() => navigate("/orders")}
    className={`w-full text-left p-2 rounded ${
      location.pathname === "/orders" ? "bg-gray-700" : "hover:bg-gray-700"
    }`}
  >
    Orders
  </button>
</li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-white">{children}</main>
    </div>
  );
};

export default AdminLayout;