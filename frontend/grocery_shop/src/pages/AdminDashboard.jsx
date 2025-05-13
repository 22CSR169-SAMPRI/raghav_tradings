import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import API from "../api"; // Ensure this is your API utility

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [salesSummary, setSalesSummary] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [topProductSales, setTopProductSales] = useState([]);
  const [salesThisYear, setSalesThisYear] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch sales summary
        const salesSummaryResponse = await API.get("/api/dashboard/sales-summary");
        setSalesSummary(salesSummaryResponse.data);

        // Fetch popular products
        const popularProductsResponse = await API.get("/api/dashboard/popular-products");
        setPopularProducts(popularProductsResponse.data);

        // Fetch top product sales
        const topProductSalesResponse = await API.get("/api/dashboard/top-product-sales");
        setTopProductSales(topProductSalesResponse.data);

        // Fetch sales this year
        const salesThisYearResponse = await API.get("/api/dashboard/sales-this-year");
        setSalesThisYear(salesThisYearResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen flex bg-gray-800">
        <main className="flex-1 p-6 text-white">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Welcome, {user?.name} (Admin)</h1>
            <p className="text-gray-300">Manage products and orders.</p>
          </div>

          {/* Sales Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {salesSummary.map((item, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded shadow">
                <div className="text-gray-300">{item.label}</div>
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div
                  className={`text-sm ${
                    item.change.startsWith("+") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.change}
                </div>
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
                  data={topProductSales}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {topProductSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="text-center font-bold text-xl mt-2 text-white">
                ₹{topProductSales.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
              </div>
            </div>

            {/* Middle Column: Popular Products */}
            <div className="col-span-1 bg-gray-700 p-4 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Popular Products</h2>
              </div>
              {popularProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-600"
                >
                  <div>
                    <div className="text-white">{product.name}</div>
                    <div className="text-gray-400">₹{product.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Sales this Year */}
            <div className="col-span-1 bg-gray-700 p-4 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Sales this Year</h2>
              </div>
              <BarChart width={300} height={200} data={salesThisYear}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}