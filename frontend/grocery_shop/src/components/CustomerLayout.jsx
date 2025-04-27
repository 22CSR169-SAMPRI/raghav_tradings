import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Coffee,
  Apple,
  Leaf,
  ShoppingCart,
} from "lucide-react";

const CustomerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const productCategories = [
    { icon: <Apple className="w-6 h-6 text-green-600" />, label: "Cereals", route: "/category/cereals" },
    { icon: <Leaf className="w-6 h-6 text-green-600" />, label: "Spices", route: "/category/spices" },
    { icon: <Coffee className="w-6 h-6 text-green-600" />, label: "Beverages", route: "/category/beverages" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold mb-6">Raghav Tradings</h2>
          <nav>
            <ul className="space-y-4">
              {/* Categories Section */}
              <li>
                <h3 className="text-lg font-semibold text-gray-300">Categories</h3>
                <ul className="space-y-2 mt-2">
                  {productCategories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => navigate(category.route)}
                        className={`w-full flex items-center space-x-2 text-left p-2 rounded ${
                          location.pathname === category.route
                            ? "bg-gray-700"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        {category.icon}
                        <span>{category.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
              {/* Cart Section */}
              <li>
                <button
                  onClick={() => navigate("/cart")}
                  className={`w-full flex items-center space-x-2 text-left p-2 rounded ${
                    location.pathname === "/cart"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  <span>Cart</span>
                </button>
              </li>
              {/* Logout Button */}
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-white">{children}</main>
    </div>
  );
};

export default CustomerLayout;