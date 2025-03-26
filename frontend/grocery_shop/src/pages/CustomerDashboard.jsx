import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Truck,
  RefreshCcw,
  Tag,
  ShieldCheck,
  Coffee,
  Apple,
  Leaf,
  Beef,
  PawPrint,
  Wine,
} from "lucide-react";

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

  const featuredCategories = [
    { icon: <Coffee className="w-8 h-8 text-green-600" />, label: "Coffees & Teas" },
    { icon: <Apple className="w-8 h-8 text-green-600" />, label: "Fruits & Vegetables" },
    { icon: <Leaf className="w-8 h-8 text-green-600" />, label: "Bread Sweets" },
    { icon: <Beef className="w-8 h-8 text-green-600" />, label: "Raw Meat" },
    { icon: <PawPrint className="w-8 h-8 text-green-600" />, label: "Pet Food" },
    { icon: <Wine className="w-8 h-8 text-green-600" />, label: "Wines & Drinks" },
  ];

  const featuresList = [
    { icon: <Truck className="w-6 h-6 text-green-600" />, text: "Free Shipping" },
    { icon: <RefreshCcw className="w-6 h-6 text-green-600" />, text: "Easy Return" },
    { icon: <Tag className="w-6 h-6 text-green-600" />, text: "Great Daily Deal" },
    { icon: <ShieldCheck className="w-6 h-6 text-green-600" />, text: "100% Secure Payment" },
  ];

  const productCategories = [
    {
      title: "Fruits & Vegetables",
      description: "GET UP TO 30% OFF",
      image: "/api/placeholder/300/200?text=Fruits+Vegetables",
    },
    {
      title: "Multi Grains & Beans",
      description: "GET UP TO 25% OFF",
      image: "/api/placeholder/300/200?text=Grains+Beans",
    },
    {
      title: "Freshly Baked Buns",
      description: "GET UP TO 35% OFF",
      image: "/api/placeholder/300/200?text=Baked+Buns",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Raghav Tradings</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/orders")}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                My Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/cart")}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Cart
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Checkout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-gray-400 mt-2">Manage your orders and checkout easily.</p>

        {/* Hero Section */}
        <div className="bg-green-50 flex items-center p-8 rounded-lg my-8">
          <div className="w-1/2 space-y-4">
            <h1 className="text-4xl font-bold">
              Fresh Vegetables
              <span className="text-green-600"> Big Discount</span>
            </h1>
            <p className="text-gray-600">Save Up To 30% On Your First Order</p>
            <button
              onClick={() => navigate("/cart")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              Shop Now
            </button>
          </div>
          <div className="w-1/2 flex justify-end relative">
            <div className="absolute bg-orange-500 w-72 h-72 rounded-full -top-8 right-0 z-0"></div>
            <img
              src="/api/placeholder/400/400?text=Vegetables"
              alt="Vegetables"
              className="relative z-10 rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Features Bar */}
        <div className="flex justify-between p-6 bg-white shadow-sm rounded-lg my-4">
          {featuresList.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              {feature.icon}
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Product Categories */}
        <div className="grid grid-cols-3 gap-4 my-8">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center"
            >
              <img src={category.image} alt={category.title} className="mb-4 rounded-lg" />
              <h3 className="font-bold text-lg">{category.title}</h3>
              <p className="text-orange-500">{category.description}</p>
              <button
                onClick={() => navigate("/cart")}
                className="mt-4 border border-green-600 text-green-600 px-4 py-2 rounded"
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Featured Category</h2>
          <div className="flex justify-between">
            {featuredCategories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
              >
                {category.icon}
                <span className="mt-2 text-sm">{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;