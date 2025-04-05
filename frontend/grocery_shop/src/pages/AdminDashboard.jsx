import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sales Summary Data
const salesSummaryData = [
  { label: "Total Order", value: "4.56k+", change: "+10%" },
  { label: "Order Pending", value: "15k+", change: "+10%" },
  { label: "Order Processing", value: "6k+", change: "+10%" },
  { label: "Total Delivery", value: "10k+", change: "+10%" },
];

// Popular Products Data
const popularProductsData = [
  { name: "Apple ", price: "₹105.60"},
  { name: "Strawberry Juice ", price: "₹245.80" },
  { name: "Banana", price: "₹648.60" },
  { name: "Grapefruit Juice", price: "₹648.60" },
];

// Top Product Sale Data
const topProductSaleData = [
  { name: "Product A", value: 40, color: "#FF6384" },
  { name: "Product B", value: 30, color: "#36A2EB" },
  { name: "Product C", value: 20, color: "#FFCE56" },
  { name: "Product D", value: 10, color: "#4BC0C0" },
];

// Sales This Month Data
const salesThisMonthData = [
  { week: "Week 1", sales: 100 },
  { week: "Week 2", sales: 200 },
  { week: "Week 3", sales: 350 },
  { week: "Week 4", sales: 510 },
  { week: "Week 5", sales: 300 },
];

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Raghav Tradings (Admin)</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/add-items")}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Add items
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/manage-products")}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Manage Products
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="w-full text-left p-2 bg-red-600 hover:bg-red-500 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user?.name} (Admin)</h1>
          <p className="text-gray-300">Manage products and orders.</p>
        </div>

        {/* Sales Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {salesSummaryData.map((item, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded shadow">
              <div className="text-gray-300">{item.label}</div>
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-green-400 text-sm">{item.change}</div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column: Top Product Sale */}
          <div className="col-span-1 bg-gray-700 p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Top Product Sale</h2>
            <PieChart width={300} height={250}>
              <Pie
                data={topProductSaleData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {topProductSaleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="text-center font-bold text-xl mt-2 text-white">₹3,250.00</div>
          </div>

          {/* Middle Column: Popular Products */}
          <div className="col-span-1 bg-gray-700 p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Popular Products</h2>
              
            </div>
            {popularProductsData.map((product, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600">
                <div>
                  <div className="text-white">{product.name}</div>
                  <div className="text-gray-400">{product.price}</div>
                </div>
                
              </div>
            ))}
          </div>

          {/* Right Column: Sales this Month */}
          <div className="col-span-1 bg-gray-700 p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Sales this Month</h2>
              <select className="text-gray-300 bg-gray-800 border border-gray-600 rounded">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
            <BarChart width={300} height={200} data={salesThisMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </main>
    </div>
  );
}