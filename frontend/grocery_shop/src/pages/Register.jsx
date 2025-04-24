import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/register", { name, email, password, role });
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Raghav Tradings</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/login"
                className="block text-lg font-medium hover:bg-gray-700 p-2 rounded"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block text-lg font-medium hover:bg-gray-700 p-2 rounded"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Register Form */}
      <main className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl w-96">
          <h2 className="text-3xl text-white text-center mb-6">Register to <br></br>Raghav Tradings</h2>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg font-semibold transition">
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}