import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Coffee,
  Apple,
  Leaf,
  Beef,
  PawPrint,
  Wine,
  ShoppingCart,
} from "lucide-react";
import CustomerLayout from "../components/CustomerLayout";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "customer") {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const productCategories = [
    { icon: <Apple className="w-6 h-6 text-green-600" />, label: "Cereals", route: "/category/cereals" },
    { icon: <Leaf className="w-6 h-6 text-green-600" />, label: "Spices", route: "/category/spices" },
    { icon: <Coffee className="w-6 h-6 text-green-600" />, label: "Beverages", route: "/category/beverages" },
  ];

  return (
    <CustomerLayout>
    <div className="min-h-screen flex">
      {/* Sidebar
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Raghav Tradings</h2>
        <nav>
          <ul className="space-y-4">
             Categories Section 
            <li>
              <h3 className="text-lg font-semibold text-gray-300">Categories</h3>
              <ul className="space-y-2 mt-2">
                {productCategories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(category.route)}
                      className="w-full flex items-center space-x-2 text-left p-2 hover:bg-gray-700 rounded"
                    >
                      {category.icon}
                      <span>{category.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
             Cart Section 
            <li>
              <button
                onClick={() => navigate("/cart")}
                className="w-full flex items-center space-x-2 text-left p-2 hover:bg-gray-700 rounded"
              >
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <span>Cart</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 bg-gray-800 text-white p-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-gray-300 mt-2">Explore our products and manage your cart.</p>

        {/* Hero Section */}
        <div className="bg-gray-700 flex items-center p-8 rounded-lg my-8">
          <div className="w-1/2 space-y-4">
            <h1 className="text-4xl font-bold">
              
              <span className="text-green-400"> Big Discount</span>
            </h1>
            <p className="text-gray-300">Save Up To 30% On Your First Order</p>
            <button
              onClick={() => navigate("/cart")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              Shop Now
            </button>
          </div>
          <div className="w-1/2 flex justify-end relative">
            <img
              src="https://thumbs.dreamstime.com/b/web-179112724.jpg"
              alt="Vegetables"
              className="relative z-10 rounded-full w-64 h-64 object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Features Bar */}
        <div className="flex justify-between p-6 bg-gray-700 shadow-sm rounded-lg my-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">Free Shipping</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">Great Deals</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">100% Secure Payment</span>
          </div>
        </div>

        {/* Product Categories */}
        <div className="grid grid-cols-3 gap-4 my-8">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center"
            >
              {category.icon}
              <h3 className="font-bold text-lg text-white mt-2">{category.label}</h3>
              <button
                onClick={() => navigate(category.route)}
                className="mt-4 border border-green-400 text-green-400 px-4 py-2 rounded"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;