import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/api/auth/login", {
        email,
        password,
      });

      // Store token & user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials!");
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

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 border border-gray-700">
          <h2 className="text-3xl font-semibold text-center text-gray-100 mb-6">
            Login to <br></br>Raghav Tradings
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg font-semibold transition">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}