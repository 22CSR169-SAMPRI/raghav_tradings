import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Raghav Tradings (Admin)</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button onClick={() => navigate("/manage-inventory")} className="w-full text-left p-2 hover:bg-gray-700 rounded">
                Manage Inventory
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/manage-orders")} className="w-full text-left p-2 hover:bg-gray-700 rounded">
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
      <main className="flex-1 bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name} (Admin)</h1>
        <p className="text-gray-400 mt-2">Manage inventory and process orders.</p>
      </main>
    </div>
  );
}
