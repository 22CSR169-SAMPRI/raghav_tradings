import axios from "axios";

const API = axios.create({
  baseURL: "https://raghav-tradings.onrender.com", // Adjust if needed
  headers: { "Content-Type": "application/json" },
});

export default API;
