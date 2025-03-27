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
} from "recharts";

// Inventory Data
const inventoryData = [
  { name: "Product A", stock: 120 },
  { name: "Product B", stock: 80 },
  { name: "Product C", stock: 50 },
  { name: "Product D", stock: 30 },
  { name: "Product E", stock: 200 },
];

export default function ManageInventory() {
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
                onClick={() => navigate("/admin-dashboard")}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/manage-orders")}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Manage Orders
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
          <h1 className="text-3xl font-bold">Manage Inventory</h1>
          <p className="text-gray-300">Track and update product stock levels.</p>
        </div>

        {/* Inventory Summary */}
        <div className="grid grid-cols-2 gap-6">
          {/* Inventory Chart */}
          <div className="col-span-1 bg-gray-700 p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Inventory Levels</h2>
            <BarChart width={500} height={300} data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#8884d8" />
            </BarChart>
          </div>

          {/* Inventory List */}
          <div className="col-span-1 bg-gray-700 p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Product Inventory</h2>
            <div className="space-y-4">
              {inventoryData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-800 rounded"
                >
                  <div className="text-white">{item.name}</div>
                  <div className="text-green-400">{item.stock} in stock</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}