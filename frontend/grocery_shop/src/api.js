import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",                  //"https://raghav-tradings.onrender.com", // Adjust if needed
  headers: { "Content-Type": "application/json" },
});

export default API;
